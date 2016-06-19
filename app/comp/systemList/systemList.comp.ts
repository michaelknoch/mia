import {Component, OnInit} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SystemService} from "../../service/system/system.service";
import {Router} from "@angular/router-deprecated";
import {DataService} from "../../service/data.service";
import {UserService} from "../../service/user/user.service";
import {SystemPicker} from "./systemPicker/systemPicker.comp";

@Component({
    moduleId: module.id,
    directives: [ROUTER_DIRECTIVES, SystemPicker],
    templateUrl: 'systemList.html',
    styleUrls: ['systemList.css'],
})

export class SystemList {

    constructor(private _router: Router) {
    }

    handleSystemPick(system) {
        this._router.navigate(['Root', {systemId: system.id}])
    }

}
