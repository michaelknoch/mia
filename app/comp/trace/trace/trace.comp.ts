import {Component, OnInit} from '@angular/core'
import {TraceService} from "../trace.service";
import {Router, RouteParams} from '@angular/router-deprecated';

@Component({
    moduleId: module.id,
    selector: 'trace',
    templateUrl: 'trace.html',
    styleUrls: ['trace.css'],
})

export class Trace implements OnInit {

    private nodes = [];

    constructor(private _traceService: TraceService, private params: RouteParams) {
    }

    ngOnInit() {
        console.info(this.params.get('traceId'));
        this._traceService.getTrace(this.params.get('traceId')).subscribe(
            data => {
                console.info('data:', data);
                this.nodes = this.parse(data).nodes;
                console.info(this.nodes);
            })
    }

    parse(data: any) {
        let nodes = [];
        nodes.push(this.getEntryPoint(data));

        let calculationData = {
            basis_point: 100 / (nodes[0][0].response.timeCR - nodes[0][0].request.timeCS),
            start: nodes[0][0].request.timeCS,
            end: nodes[0][0].response.timeCR,
        };

        let childs = this.getChilds(nodes[0][0].request.requestId, data, calculationData);
        while (childs.length) {
            nodes.push(childs);
            childs = this.getChilds(childs[0].request.requestId, data, calculationData)
        }

        return {
            calc: calculationData,
            nodes: nodes
        }
    }

    getChilds(id: String, data: any, calculationData: any) {
        let items = [];

        for (let item of data) {
            if (item.response.parentId === id) {
                item.left = (item.request.timeCS - calculationData.start) * calculationData.basis_point + '%';
                //item.right = 100 - ((calculationData.end - item.response.timeCR) * calculationData.basis_point) + '%';
                item.width = (item.request.duration.low / 1000) * calculationData.basis_point + '%';
                item.name = item.receiver.name;
                items.push(item);
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
                item.width = '100%';
                item.name = item.sender.name;

                return [item];
            }
        }
        return [];
    }
}
