import {Component} from '@angular/core'
import {ApplicationList} from "./applicationList/applicationList.comp";

@Component({
    moduleId: module.id,
    templateUrl: 'applications.html',
    directives: [ApplicationList],
    styleUrls: ['applications.css']
})

export class Applications {
    
    constructor() {
    }

}
