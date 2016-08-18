import {Component, OnInit} from '@angular/core';
import {TraceService} from "../trace.service";
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated'
import {Loading} from "../../loading/loading.comp";
import {mock2} from "../trace-mock";

@Component({
    moduleId: module.id,
    selector: 'trace-list',
    templateUrl: 'traceList.html',
    styleUrls: ['traceList.css'],
    directives: [ROUTER_DIRECTIVES, Loading]
})

export class TraceList implements OnInit {

    private traces = mock2;
    private loading: boolean = false;

    constructor(private _traceService: TraceService) {
    }

    ngOnInit() {
        /*this._traceService.getTraces().subscribe(data => {
            this.traces = data;
            this.loading = false;
        })*/
    }

}
