import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Dashboard} from '../dashboard/comp';
import {Settings} from '../settings/comp';
import {Feed} from "../feed/feed.comp";
import {DataService} from "../../service/data.service";
import {ApplicationList} from "../applicationList/applicationList.comp";


@Component({
    moduleId: module.id,
    templateUrl: 'root.html',
    styleUrls: ['style.css'],
    directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
    {path: '/dashboard', component: Dashboard, name: 'Dashboard', useAsDefault: true},
    {path: '/applications', component: ApplicationList, name: 'ApplicationList',},
    {path: '/feed', component: Feed, name: 'Feed'},
    {path: '/settings', component: Settings, name: 'Settings'}
])

export class Root {

    userData = {
        name: '',
        companyName: ''
    };

    constructor(private _dataService: DataService, private _router: Router) {
        /* this.userData.name = this._dataService.getData('current-user').name;
         this.userData.companyName = this._dataService.getData('current-company').name;*/
    }


}
