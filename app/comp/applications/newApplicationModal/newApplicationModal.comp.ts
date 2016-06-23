import {Component, Output, EventEmitter} from '@angular/core'
import {ApplicationService} from "../../../service/application/application.service";

@Component({
    moduleId: module.id,
    selector: 'new-application',
    templateUrl: 'newApplicationModal.html',
    styleUrls: ['newApplicationModal.css'],
})

export class NewApplicationModal {

    private visible: boolean = false;
    private name: String;
    private description: String;
    @Output() public update: EventEmitter<any> = new EventEmitter();

    constructor(private _ApplicationService: ApplicationService) {
    }

    public show() {
        this.visible = true;
    }

    public hide() {
        this.visible = false;
    }

    newApplication() {
        this._ApplicationService.createApplication(this.name, this.description).subscribe(
            data => {
                console.info('create company success');
                this.visible = false;
                this.update.emit(data);
            },
            err => console.info(err)
        )
    }

    err(msg) {
        console.error(msg);
    }

}
