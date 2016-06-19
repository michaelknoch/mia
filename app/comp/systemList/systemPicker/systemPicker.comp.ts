import {Component, OnInit} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SystemService} from "../../service/system/system.service";
import {Router} from "@angular/router-deprecated";
import {DataService} from "../../service/data.service";
import {UserService} from "../../service/user/user.service";

@Component({
    moduleId: module.id,
    selector: 'project-list',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'systemList.html',
    styleUrls: ['systemList.css'],
})

export class SystemList implements OnInit {

    private systems;
    private currentUserName;

    ngOnInit() {
        this.currentUserName = this._userService.getLocalMe().user.name;
    }

    constructor(private _systemService: SystemService, private _router: Router, private _userService: UserService) {

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
            this._router.navigate(['Root', {systemId: data.newSystemId}])
        });
    }

}
