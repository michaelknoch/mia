import {Component} from '@angular/core'
import {ApplicationList} from "./applicationList/applicationList.comp";
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    moduleId: module.id,
    templateUrl: 'applications.html',
    directives: [ROUTER_DIRECTIVES, ApplicationList],
    styleUrls: ['applications.css']
})

export class Applications {

    constructor() {
    }

}
