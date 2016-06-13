import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Dashboard} from '../dashboard/comp';
import {Settings} from '../settings/comp';
import {Feed} from "../feed/feed.comp";
import {DataService} from "../../service/data.service";
import {ApplicationList} from "../applicationList/applicationList.comp";
import {NewApplication} from "../newApplication/newApplication.comp";
import {Metrics} from "../metrics/metrics.comp";
import {Graph} from "../graph/graph.comp";
import {UserService} from "../../service/user/user.service";


@Component({
    moduleId: module.id,
    templateUrl: 'root.html',
    styleUrls: ['style.css'],
    directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
    {path: '/dashboard', component: Dashboard, name: 'Dashboard', useAsDefault: true},
    {path: '/applications', component: ApplicationList, name: 'Applications',},
    {path: '/new-application', component: NewApplication, name: 'New-application',},
    {path: '/feed', component: Feed, name: 'Feed'},
    {path: '/settings', component: Settings, name: 'Settings'},
    {path: '/metrics', component: Metrics, name: 'Metrics'},
    {path: '/graph', component: Graph, name: 'Graph'}

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
