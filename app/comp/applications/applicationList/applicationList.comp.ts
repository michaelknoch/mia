import {Component, ViewChild} from '@angular/core'
import {ApplicationService} from '../../../service/application/application.service';
import {NewApplicationModal} from '../../../../dist/comp/applications/newApplicationModal/newApplicationModal.comp';

@Component({
    moduleId: module.id,
    selector: 'application-list',
    directives: [NewApplicationModal],
    templateUrl: 'applicationList.html',
    styleUrls: ['applicationList.css']
})

export class ApplicationList {

    private applications = [];
    @ViewChild(NewApplicationModal) _newApplicationModal;

    constructor(private _ApplicationService: ApplicationService) {
        this.getData()
    }

    getData() {
        this._ApplicationService.getApplications().subscribe(
            data => {
                this.applications = data;
                console.info(data);
            },
            err => console.error(err)
        );
    }

    update(data: any) {
        console.info(data);
        this.getData()
    }

}
