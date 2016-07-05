import {Component, ViewChild} from '@angular/core'
import {ApplicationService} from '../../../service/application/application.service';
import {NewApplicationModal} from '../../applications/newApplicationModal/newApplicationModal.comp';
import {LocalStorage} from "angular2-localstorage/dist";
declare var moment: any;

@Component({
    moduleId: module.id,
    selector: 'application-list',
    directives: [NewApplicationModal],
    templateUrl: 'applicationList.html',
    styleUrls: ['applicationList.css']
})

export class ApplicationList {

    private applications = [];
    @LocalStorage() private hideTokenExample: boolean;

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

    getApplicationStatus(isoString: string) {
        let date = new Date(isoString);
        let now = new Date();
        let status: string = ((now.getTime() - date.getTime()) > 3600000) ? 'red' : 'green';

        return {
            status: status,
            moment: moment(date).fromNow()
        }
    }

    copyToken(element: any) {
        let _elem = element.currentTarget.childNodes[1];
        if (_elem) {
            _elem.select();
        }
        document.execCommand('copy');
    }

    prepareToken(token: string) {
        let string = "require('shimmingtest').start({\n\t'app_token': '" + token + "'\n});";
        return string;
    }

}
