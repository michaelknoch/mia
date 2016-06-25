import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Login} from './comp/login/login.comp';
import {Root} from './comp/root/root.comp';
import {SystemList} from "./comp/systemList/systemList.comp";

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

    constructor(private _router: Router) {
        console.info('code rennt');
        this.socket = io('http://localhost:4000');

        this.socket.on('hey', () => {
            console.log('hey electron');
            this.socket.emit('cu');
        });
    }


}