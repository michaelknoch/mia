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

    constructor(private _traceService: TraceService, private params: RouteParams) {
        console.info('init');
    }

    ngOnInit() {
        console.info(this.params.get('traceId'));
        this._traceService.getData(this.params.get('traceId')).subscribe(
            data => {
                console.info('data:', data);
                console.info(this.parse(data));
            })
    }

    parse(data: any) {
        let entryPoint = this.getEntryPoint(data);

        return {
            entry: entryPoint,
            start: entryPoint.request.timeSR,
            end: entryPoint.response.timeSS
        }
    }

    getEntryPoint(data: any) {
        for (let item of data) {
            if (item.request.requestId === item.request.traceId) {

                if (!item.request.timeSR && !item.response.timeSS) {
                    item.request.timeSR = item.request.timeCS;
                    item.response.timeSS = item.request.timeCR;
                }

                return item;
            }
        }
        return null;
    }
}
