import {Component, OnInit} from '@angular/core'
import {TraceService} from "./trace.service";
import {Router, RouteParams} from '@angular/router-deprecated';

@Component({
    moduleId: module.id,
    selector: 'trace',
    templateUrl: 'trace.html',
    styleUrls: ['trace.css'],
})

export class Trace implements OnInit {

    private nodes = [[{left: '0%', right: '0%'}], [{left: '10%', right: '80%'}, {
        left: '25%',
        right: '40%'
    }], [{left: '10%', right: '50%'}]];

    constructor(private _traceService: TraceService, private params: RouteParams) {
    }

    ngOnInit() {
        console.info(this.params.get('traceId'));
        this._traceService.getData(this.params.get('traceId')).subscribe(
            data => {
                console.info('data:', data);
                //this.nodes = this.parse(data).nodes;
            })
    }

    parse(data: any) {
        let nodes = [];
        nodes.push(this.getEntryPoint(data));

        let calculationData = {
            basis_point: 100 / (nodes[0].response.timeSS - nodes[0].request.timeSR),
            start: nodes[0].request.timeSR,
            end: nodes[0].response.timeSS,
        };

        let childs = this.getChilds(nodes[0].request.requestId, data, calculationData);
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
                item.right = 100 - ((calculationData.end - item.request.CR) * calculationData.basis_point) + '%';
                items.push(item);
            }
        }
        return items;
    }

    getEntryPoint(data: any) {
        for (let item of data) {
            if (item.request.requestId === item.request.traceId) {

                if (!item.request.timeSR && !item.response.timeSS) {
                    item.request.timeSR = item.request.timeCS;
                    item.response.timeSS = item.request.timeCR;
                }
                item.left = 0;
                item.right = 0;
                return item;
            }
        }
        return null;
    }
}
