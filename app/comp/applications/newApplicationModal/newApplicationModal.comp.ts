import {Component, Output, EventEmitter} from '@angular/core'
import {ApplicationService} from "../application.service";
import {AbstractModal} from "../../../abstractionModel/abstractModal";

@Component({
    moduleId: module.id,
    selector: 'new-application',
    templateUrl: 'newApplicationModal.html'
})

export class NewApplicationModal extends AbstractModal {

    private name: String;
    private description: String;

    constructor(private _ApplicationService: ApplicationService) {
        super();
    }

    newApplication() {
        this._ApplicationService.createApplication(this.name, this.description).subscribe(
            data => {
                console.info('create company success');
                this.hide();
                this.update.emit(data);
            },
            err => console.info(err)
        )
    }

    err(msg) {
        console.error(msg);
    }

}
