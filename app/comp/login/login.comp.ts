import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {UserService} from "../../service/user/user.service";
import {LocalStorage, SessionStorage} from "angular2-localstorage/dist";
import {LoginRegister} from "./loginRegister/loginRegister.comp";

@Component({
    moduleId: module.id,
    templateUrl: 'login.html',
    styleUrls: ['login.css'],
    providers: [UserService],
    directives: [LoginRegister]
})

export class Login implements OnInit {

    constructor(private _userService: UserService, private _router: Router) {
    }

    ngOnInit() {

        const system = this._userService.getLocalMe().system.id;
        const user = this._userService.getLocalMe().user.id;

        if (user && system) {
            console.log('found local system, redirecting');
            this._router.navigate(['Root', {systemId: system}])

        } else if (!system && user) {
            this._router.navigate(['System-list']);
        }
    }

    private loginHandler(data: any) {
        this._router.navigate(['System-list']);
    }

}
