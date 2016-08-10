import {Component, Output, EventEmitter} from '@angular/core'
import {UserService} from "../../../sharedServices/user.service";

@Component({
    moduleId: module.id,
    selector: 'login-register',
    templateUrl: 'loginRegister.html',
    styleUrls: ['loginRegister.css'],
})

export class LoginRegister {

    @Output() public loginEvent: EventEmitter<any> = new EventEmitter();

    private err: string;
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
            err => this.onErr(err));
    }

    private register() {
        this._userService.register(this.mail, this.password, this.name, this.surname).subscribe(
            data => {
                this.emit(data);
            },
            err => this.onErr(err));
    }

    onErr(msg) {
        console.error(msg);
        this.err = msg;
    }

    private emit(data) {
        this.err = '';
        this.loginEvent.emit({
            name: data.name,
            id: data._id,
            status: 200
        });
    }

}
