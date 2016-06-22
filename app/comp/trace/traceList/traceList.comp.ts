import {Component, OnInit} from '@angular/core';
import {TraceService} from "../trace.service";
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'

@Component({
    moduleId: module.id,
    selector: 'trace-list',
    templateUrl: 'traceList.html',
    styleUrls: ['traceList.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class TraceList implements OnInit {

    private traces = [];

    constructor(private _traceService: TraceService) {
    }

    ngOnInit() {
        this._traceService.getTraces().subscribe(data => {
            this.traces = data;
        })
    }

}
