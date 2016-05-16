import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ApplicationService} from "../../service/application/application.service";

@Component({
    moduleId: module.id,
    selector: 'costumer',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'applicationList.html',
    styleUrls: ['applicationList.css']
})

export class ApplicationList {

    applications;

    constructor(private _ApplicationService: ApplicationService) {

        _ApplicationService.getApplications().subscribe(
            data => {
                this.applications = data;
                console.info(data);
            },
            err => console.error(err)
        );

    }

}
