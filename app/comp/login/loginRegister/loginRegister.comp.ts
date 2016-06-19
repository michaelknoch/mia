import {Component, Output, EventEmitter} from '@angular/core'
import {UserService} from "../../../service/user/user.service";

@Component({
    moduleId: module.id,
    selector: 'login-register',
    templateUrl: 'loginRegister.html',
    providers: [UserService],
    styleUrls: ['loginRegister.css'],
})

export class LoginRegister {

    @Output() public loginEvent: EventEmitter<any> = new EventEmitter();

    private loginState: Boolean = true;
    private password: String;
    private mail: String;
    private name: String;
    private surname: String;


    constructor(private _userService: UserService) {
    }

    private login() {
        this._userService.login(this.mail, this.password).subscribe(
            data => {
                this.emit(data);
            },
            err => err(err));
    }

    private register() {
        this._userService.register(this.mail, this.password, this.name, this.surname).subscribe(
            data => {
                this.emit(data);
            },
            err => err(err));
    }

    static err(msg) {
        console.error(msg);
    }

    private emit(data) {
        this._userService.setUser({name: data.name, id: data._id});
        this.loginEvent.emit({
            name: data.name,
            id: data._id,
            status: 200
        });
    }

}