import {Component} from '@angular/core'
import {GenericModalService} from "./genericModal.service";

@Component({
    moduleId: module.id,
    selector: 'generic-modal', 
    templateUrl: 'genericModal.html', 
})

export class GenericModal {
    
    constructor(private _modal: GenericModalService) {

    }

    private hide() {
        this._modal.close();
    }

    private getModal() {
        return this._modal.getModal();
    }

}
