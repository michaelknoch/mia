import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Login} from './comp/login/login.comp';
import {Root} from './comp/root/root.comp';
import {SystemList} from "./comp/systemList/systemList.comp";
import {IpcService} from "./service/ipc.service";

declare var electron: any;

@Component({
    moduleId: module.id,
    selector: 'dash',
    templateUrl: 'app.html',
    directives: [ROUTER_DIRECTIVES]
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

    socket = null;

    constructor(private _router: Router, private _ipc: IpcService) {

    }


}