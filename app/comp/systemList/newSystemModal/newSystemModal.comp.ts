import {Component} from '@angular/core'
import {SystemService} from "../../../service/system/system.service";
import {UserService} from "../../../service/user/user.service";
import {AbstractModal} from "../../../abstractionModel/abstractModal";


@Component({
    moduleId: module.id,
    selector: 'new-system',
    templateUrl: 'newSystemModal.html',
})

export class NewSystemModal extends AbstractModal {

    name: string;
    description: string;

    constructor(private _systemService: SystemService, private _userService: UserService) {
        super();
    }

    newSystem() {
        this._systemService.createSystem(this.name, this.description).subscribe(
            data => {
                this.hide();
                this.update.emit(data);
            },
            err => this.err(err)
        )
    }

    err(msg) {
        console.error(msg);
    }

}
