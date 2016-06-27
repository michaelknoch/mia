import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {UserService} from "../../service/user/user.service";
import {LocalStorage, SessionStorage} from "angular2-localstorage/dist";
import {LoginRegister} from "./loginRegister/loginRegister.comp";

@Component({
    moduleId: module.id,
    templateUrl: 'login.html',
    styleUrls: ['login.css'],
    directives: [LoginRegister]
})

export class Login implements OnInit {

    constructor(private _userService: UserService, private _router: Router) {
    }

    ngOnInit() {

        const localMe = this._userService.getLocalMe();
        if (localMe.user.id && localMe.system.id) {
            console.log('found local system, redirecting');
            this._router.navigate(['Root', {systemId: localMe.system.id}])

        } else if (!localMe.system.id && localMe.user.id) {
            this._router.navigate(['System-list']);
        }
    }

    private loginHandler(data: any) {
        this._router.navigate(['System-list']);
    }

}
