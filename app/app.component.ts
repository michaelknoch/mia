import {Component} from '@angular/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import {Login} from './comp/login/login.comp';
import {Root} from './comp/root/root.comp';
import {CompanyList} from "./comp/companyList/companyList.comp";
import {NewCompany} from "./comp/newCompany/newCompany.comp";

@Component({
    moduleId: module.id,
    selector: 'dash',
    templateUrl: 'app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    {
        path: '/',
        component: Login
    },
    {
        path: '/companyList',
        component: CompanyList},
    {
        path: '/new-company',
        component: NewCompany},
    {
        path: '/root/...',
        component: Root
    }
])




export class AppComponent {

}