import {Component, OnInit} from '@angular/core'
import {TraceService} from "../trace.service";
import {Router, RouteParams} from '@angular/router-deprecated';
import {Loading} from "../../loading/loading.comp";
import {SimpleGantt} from 'ng2-simplegantt/dist';

@Component({
    moduleId: module.id,
    selector: 'trace',
    templateUrl: 'trace.html',
    styleUrls: ['trace.css'],
    directives: [Loading, SimpleGantt]
})

export class Trace implements OnInit {

    private nodes = [];
    private loading: boolean = true;

    constructor(private _traceService: TraceService, private params: RouteParams) {
    }

    ngOnInit() {
        console.info(this.params.get('traceId'));
        this._traceService.getTrace(this.params.get('traceId')).subscribe(
            data => {
                console.info(data);
                this.nodes = this.parse(data).nodes;
                console.info(this.nodes);
                this.loading = false;
            })
    }

    parse(data: any) {
        let nodes = [];

        let entryPoint = this.getEntryPoint(data);
        nodes.push(entryPoint);

        let calculationData = {
            basis_point: 100 / (nodes[0][0].response.timeCR - nodes[0][0].request.timeCS),
            start: nodes[0][0].request.timeCS,
            end: nodes[0][0].response.timeCR,
        };

        nodes.push([{
            name: entryPoint[0].receiver.name,
            role: entryPoint[0].request.name,
            left: (entryPoint[0].request.timeSR - calculationData.start) * calculationData.basis_point + '%',
            right: ((calculationData.end - entryPoint[0].response.timeSS) * calculationData.basis_point) + '%',
            duration: entryPoint[0].request.duration
        }, {
            left: (entryPoint[0].request.timeCS - calculationData.start) * calculationData.basis_point + '%',
            right: ((calculationData.end - entryPoint[0].response.timeCR) * calculationData.basis_point) + '%',
            cs: true
        }]);


        let childs = this.getChilds(entryPoint, data, calculationData);
        while (childs.length) {
            nodes.push(childs);
            childs = this.getChilds(childs, data, calculationData)
        }

        return {
            calc: calculationData,
            nodes: nodes
        }
    }

    getChilds(childs: any, data: any, calculationData: any) {
        let items = [];

        for (let child of childs) {
            if (!child.request) {
                continue;
            }
            const id = child.request.requestId;

            for (let item of data) {
                if (item.response.parentId === id) {

                    item.left = (item.request.timeSR - calculationData.start) * calculationData.basis_point + '%';
                    item.right = ((calculationData.end - item.response.timeSS) * calculationData.basis_point) + '%';

                    item.name = item.receiver.name;
                    item.role = item.request.name;
                    item.duration = item.request.duration;
                    items.push(item);

                    let inner = {
                        left: (item.request.timeCS - calculationData.start) * calculationData.basis_point + '%',
                        right: ((calculationData.end - item.response.timeCR) * calculationData.basis_point) + '%',
                        cs: true
                    };

                    items.push(inner);
                }
            }
        }
        return items;
    }

    getEntryPoint(data: any) {
        for (let item of data) {
            if (item.request.requestId === item.request.traceId) {

                if (!item.request.timeCS && !item.response.timeCR) {
                    console.info('edgecase');
                    item.request.timeCS = item.request.timeSR;
                    item.response.timeCR = item.response.timeSS;
                }

                item.left = 0;
                item.right = 0;

                item.name = item.sender.name;
                item.role = item.request.name;
                item.duration = item.response.duration;

                return [item];
            }
        }
        return [];
    }
}
