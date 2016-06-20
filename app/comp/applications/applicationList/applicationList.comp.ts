import {Component} from '@angular/core'
import {ApplicationService} from "../../../service/application/application.service";

@Component({
    moduleId: module.id,
    selector: 'application-list',
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
