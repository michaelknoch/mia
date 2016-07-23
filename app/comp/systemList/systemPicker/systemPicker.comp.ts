import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SystemService} from "../system.service";
import {UserService} from "../../../sharedServices/user.service";
import {NewSystemModal} from "../newSystemModal/newSystemModal.comp";

@Component({
    moduleId: module.id,
    selector: 'system-picker',
    directives: [NewSystemModal],
    templateUrl: 'systemPicker.html',
    styleUrls: ['systemPicker.css'],
})

export class SystemPicker implements OnInit {

    private systems;
    private currentUserName;

    @ViewChild(NewSystemModal) _newSystemModal;
    @Output() public update: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.currentUserName = this._userService.getLocalMe().user.name;
    }

    constructor(private _systemService: SystemService, private _userService: UserService) {

        this.getData();
    }

    private getData() {
        this._systemService.getSystems().subscribe(
            data => {
                this.systems = data;
                console.info(data);
            },
            err => console.error(err)
        );
    }

    selectSystem(system) {
        this._systemService.selectSystem(system._id, system.name).subscribe(data => {
            console.info('select company', data);
            this.update.emit({name: system.name, id: data.newSystemId})
        });
    }

}
