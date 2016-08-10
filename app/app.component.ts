import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Login} from './comp/login/login.comp';
import {Root} from './comp/root/root.comp';
import {SystemList} from "./comp/systemList/systemList.comp";
import {IpcService} from "./sharedServices/ipc.service";
import {GenericModal} from "./comp/genericModal/genericModal.comp";

@Component({
    moduleId: module.id,
    selector: 'dash',
    templateUrl: 'app.html',
    directives: [ROUTER_DIRECTIVES, GenericModal]
})

@RouteConfig([
    {
        path: '/',
        component: Login,
        name: 'Login'
    },
    {
        path: '/system-list',
        component: SystemList,
        name: 'System-list'
    },
    {
        path: '/root/...',
        component: Root,
        name: 'Root'
    }
])


export class AppComponent {

    constructor(private _ipc: IpcService) {
    }


}