import {Component, OnInit, ViewChild} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SystemService} from "./system.service";
import {Router} from "@angular/router-deprecated";
import {UserService} from "../../sharedServices/user.service";
import {SystemPicker} from "./systemPicker/systemPicker.comp";
import {NewSystemModal} from "./newSystemModal/newSystemModal.comp";

@Component({
    moduleId: module.id,
    directives: [ROUTER_DIRECTIVES, SystemPicker, NewSystemModal],
    templateUrl: 'systemList.html',
    styleUrls: ['systemList.css'],
})

export class SystemList {
    
    constructor(private _router: Router) {
    }

    handleSystemPick(system) {
        this._router.navigate(['Root'])
    }
}
