import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {UserService} from "../../service/user/user.service";
import {DataService} from "../../service/data.service";
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Component({
    moduleId: module.id,
    templateUrl: 'login.html',
    styleUrls: ['login.css'],
})

export class Login {

    loginState: Boolean = true;

    password: String;
    mail: String;
    name: String;
    surname: String;

    constructor(private _router: Router, private _userService: UserService,
                private _dataService: DataService) {
    }

    login() {
        this._userService.login(this.mail, this.password).subscribe(
            data => {
                this._dataService.setData('current-user', data);
                this._router.navigate(['System-list']);
            },
            err => this.err(err));

    }

    logout() {
        this._userService.logout().subscribe(data => {
            console.info('logout');
        });
    }

    register() {
        this._userService.register(this.mail, this.password, this.name, this.surname).subscribe(
            data => {
                this._router.navigate(['System-list'])
                this._dataService.setData('current-user', data);
            },
            err => this.err(err));
    }

    err(msg) {
        console.error(msg);
    }

}
