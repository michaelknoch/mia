import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Dashboard} from '../dashboard/comp';
import {Settings} from '../settings/comp';
import {Feed} from "../feed/feed.comp";
import {DataService} from "../../service/data.service";
import {Applications} from "../applications/applications.comp";
import {NewApplication} from "../newApplication/newApplication.comp";
import {Metrics} from "../metrics/metrics.comp";
import {Graph} from "../graph/graph.comp";
import {UserService} from "../../service/user/user.service";
import {Trace} from "../trace/trace/trace.comp";
import {TraceList} from "../trace/traceList/traceList.comp";


@Component({
    moduleId: module.id,
    templateUrl: 'root.html',
    styleUrls: ['style.css'],
    directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
    {path: '/dashboard', component: Dashboard, name: 'Dashboard', useAsDefault: true},
    {path: '/applications', component: Applications, name: 'Applications',},
    {path: '/new-application', component: NewApplication, name: 'New-application',},
    {path: '/feed', component: Feed, name: 'Feed'},
    {path: '/settings', component: Settings, name: 'Settings'},
    {path: '/metrics', component: Metrics, name: 'Metrics'},
    {path: '/graph', component: Graph, name: 'Graph'},
    {path: '/traces', component: TraceList, name: 'TraceList'},
    {path: '/trace/:traceId', component: Trace, name: 'Trace'}

])

export class Root implements OnInit {

    private username: string;
    private systemname: string;

    ngOnInit() {
        this.username = this._userService.getLocalMe().user.name;
        this.systemname = this._userService.getLocalMe().system.name;

    }

    constructor(private _userService: UserService, private _router: Router) {

    }

    logout() {
        this._userService.logout().subscribe(data => {
            this._router.navigate(['Login']);
        });
    }

    switchSystem() {
        this._router.navigate(['System-list']);
    }


}
