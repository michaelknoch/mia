import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ApplicationService} from "../../service/application/application.service";

@Component({
    moduleId: module.id,
    selector: 'metrics',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'metrics.html',
    styleUrls: ['metrics.css'],
})

export class Metrics {

    applications;

    constructor(private _ApplicationService: ApplicationService) {

        _ApplicationService.getApplications().subscribe(data => {
            this.applications = data;
            console.info(this.applications);
        })

    }

    selectApplication(value) {
        console.log(value);
    }

}
