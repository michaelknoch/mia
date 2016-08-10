import {Component, OnInit} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Trace} from "../trace/trace.comp";
import {Router, RouteParams} from '@angular/router-deprecated';

@Component({
    moduleId: module.id,
    selector: 'trace-view',
    directives: [ROUTER_DIRECTIVES, Trace],
    template: '<trace [id]="id"></trace>'
})

export class TraceView implements OnInit {

    private id: string;

    constructor(private params: RouteParams) {
    }

    ngOnInit() {
        this.id = this.params.get('traceId')
    }


}
