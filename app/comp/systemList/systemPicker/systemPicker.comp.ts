import {Component, OnInit, Output, EventEmitter} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SystemService} from "../../../service/system/system.service";
import {DataService} from "../../../service/data.service";
import {UserService} from "../../../service/user/user.service";

@Component({
    moduleId: module.id,
    selector: 'system-picker',
    templateUrl: 'systemPicker.html',
    styleUrls: ['systemPicker.css'],
})

export class SystemPicker implements OnInit {

    private systems;
    private currentUserName;
    @Output() public update: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.currentUserName = this._userService.getLocalMe().user.name;
    }

    constructor(private _systemService: SystemService, private _userService: UserService) {

        _systemService.getSystems().subscribe(
            data => {
                this.systems = data;
                console.info(data);
            },
            err => console.error(err)
        );
    }

    selectSystem(system) {
        this._systemService.selectSystem(system._id).subscribe(data => {
            console.info('select company', data);
            this._userService.setSystem({name: system.name, id: data.newSystemId});
            this.update.emit({name: system.name, id: data.newSystemId})
        });
    }

}
