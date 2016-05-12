import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Dashboard} from '../dashboard/comp';
import {Settings} from '../settings/comp';
import {Feed} from "../feed/feed.comp";
import {Costumer} from "../costumer/costumer.comp";
import {DataService} from "../../service/data.service";


@Component({
    moduleId: module.id,
    templateUrl: 'root.html',
    styleUrls: ['style.css'],
    directives: [ROUTER_DIRECTIVES],
})

@RouteConfig([
    {path: '/dashboard', name: 'Dashboard', component: Dashboard, useAsDefault: true},
    {path: '/costumer', name: 'Costumer', component: Costumer},
    {path: '/feed', name: 'Feed', component: Feed},
    {path: '/settings', name: 'Settings', component: Settings}
])

export class Root {

    userData = {
        name: '',
        companyName: ''
    };

    constructor(private _dataService: DataService) {
        this.userData.name = this._dataService.getData('current-user').name;
        this.userData.companyName = this._dataService.getData('current-company').name;
    }

}
