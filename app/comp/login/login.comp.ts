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

export class Login implements OnInit {

    loginState: Boolean = true;

    password: String;
    mail: String;
    name: String;
    surname: String;

    ngOnInit() {

        const system = this._userService.getLocalMe().systemId;
        const user = this._userService.getLocalMe().user.id;

        if (system) {
            console.log('found local system, redirecting');
            this._router.navigate(['Root', {systemId: system}])

        } else if (!system && user) {
            this._router.navigate(['System-list']);
        }

    }

    constructor(private _router: Router, private _userService: UserService) {
    }

    login() {
        this._userService.login(this.mail, this.password).subscribe(
            data => {
                this._userService.setUser({name: data.name, id: data._id});
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
                this._router.navigate(['System-list']);
                this._userService.setUser({name: data.name, id: data._id});
            },
            err => this.err(err));
    }

    err(msg) {
        console.error(msg);
    }

}
