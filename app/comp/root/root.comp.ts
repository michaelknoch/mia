import {Component} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
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

@Routes([
    {path: '/dashboard', component: Dashboard, useAsDefault: true},
    {path: '/costumer', component: Costumer},
    {path: '/feed', component: Feed},
    {path: '/settings', component: Settings}
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
