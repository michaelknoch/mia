import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {UserService} from "../../service/user/user.service";
import {DataService} from "../../service/data.service";


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
       /* this._userService.login(this.mail, this.password).subscribe(
            data => {
                this._dataService.setData('current-user', data.user);
                this._router.navigate(['CompanyList']);
            },
            err => this.err(err));*/

        this._router.navigate(['Project-list']);
    }

    logout() {
        this._userService.logout().subscribe(data => {
            console.info('logout');
        });
    }

    register() {
        this._userService.register(this.mail, this.password, this.name, this.surname).subscribe(
            data => this._router.navigate(['Project-list']),
            err => this.err(err));
    }

    err(msg) {
        console.error(msg);
    }

}
