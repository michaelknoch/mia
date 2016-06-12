import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Login} from './comp/login/login.comp';
import {Root} from './comp/root/root.comp';
import {SystemList} from "./comp/systemList/systemList.comp";
import {NewSystem} from "./comp/newSystem/newSystem.comp";

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
        path: '/new-system',
        component: NewSystem,
        name: 'New-system'
    },
    {
        path: '/root/:systemId/...',
        component: Root,
        name: 'Root'
    }
])


export class AppComponent {

    constructor(private _router: Router) {

    }

}