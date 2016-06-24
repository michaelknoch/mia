import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ApplicationService} from "../../service/application/application.service";

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.html',
    styleUrls: ['dashboard.css'],
    selector: 'dashboard',
})

export class Dashboard implements OnInit {

    private systemName;
    private appCount;
    private apps;

    constructor(private _userService: UserService, private _appService: ApplicationService) {
    }

    ngOnInit() {
        this.systemName = this._userService.getLocalMe().system.name;
        this._appService.getApplications().subscribe(data => {
            this.apps = data;
            this.appCount = data.length;
        })
    }


}


