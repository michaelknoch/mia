import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Dashboard} from '../dashboard/dashboard.comp';
import {Settings} from '../settings/comp';
import {Journal} from "../journal/journal.comp";
import {Applications} from "../applications/applications.comp";
import {Metrics} from "../metrics/metrics.comp";
import {Graph} from "../graph/graph.comp";
import {UserService} from "../../sharedServices/user.service";
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
    {path: '/applications', component: Applications, name: 'Applications'},
    {path: '/journal', component: Journal, name: 'Journal'},
    {path: '/settings', component: Settings, name: 'Settings'},
    {path: '/metrics', component: Metrics, name: 'Metrics'},
    {path: '/graph', component: Graph, name: 'Graph'},
    {path: '/traces', component: TraceList, name: 'TraceList'},
    {path: '/trace/:traceId', component: Trace, name: 'Trace'}

])

export class Root implements OnInit {

    private username: string;
    private systemname: string;

    private images = {
        'Timo': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p160x160/1474558_1207958742552423_6007711756409685465_n.jpg?oh=0eee20ff133ccba7335bcf6a9040fb74&oe=580A1AD8',
        'Michael': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p160x160/943793_1280165198665216_4684989572148252159_n.jpg?oh=5dc9689a604fba7044369f29f918afe4&oe=57C1E3B8'
    };

    ngOnInit() {
        this.username = this._userService.getLocalMe().user.name;
        this.systemname = this._userService.getLocalMe().system.name;
    }

    getUserThumb() {
        return this.images[this.username]
    }

    constructor(private _userService: UserService, private _router: Router) {

    }

    logout() {
        this._userService.logout().subscribe(data => {
        });
        this._router.navigate(['Login']);
    }

    switchSystem() {
        this._router.navigate(['System-list']);
    }


}
