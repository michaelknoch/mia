import {Component} from '@angular/core';
import {Router, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router';
import {Login} from './comp/login/login.comp';
import {Root} from './comp/root/root.comp';
import {ProjectList} from "./comp/projectList/projectList.comp";
import {NewProject} from "./comp/newProject/newProject.comp";

@Component({
    moduleId: module.id,
    selector: 'dash',
    templateUrl: 'app.html',
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    {
        path: '/',
        component: Login
    },
    {
        path: '/project-list',
        component: ProjectList
    },
    {
        path: '/new-project',
        component: NewProject
    },
    {
        path: '/root/...',
        component: Root
    }
])


export class AppComponent {

    constructor(private _router: Router) {

    }

}