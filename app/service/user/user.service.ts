import {Injectable} from '@angular/core';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";
import {LocalStorage, SessionStorage} from "angular2-localstorage/dist";
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    @LocalStorage() private currentSystem: any = {
        id: '',
        name: ''
    };

    @LocalStorage() private currentUser: any = {
        id: '',
        name: ''
    };

    constructor(private http: Http) {
    }

    public login(mail: String, password: String) {
        return this.http.post(Config.BASEPATH + '/users/login', JSON.stringify({
                mail: mail,
                password: password
            }))
            .map(res => res.json())
    }

    public logout() {
        this.currentUser.id = '';
        return this.http.get(Config.BASEPATH + '/users/logout')
            .map(res => res.json())
    }

    public register(mail: String, password: String, name: String, surname: String) {
        return this.http.post(Config.BASEPATH + '/users', JSON.stringify({
                mail: mail,
                password: password,
                name: name,
                surname: surname
            }))
            .map(res => res.json())
    }

    public getLocalMe() {
        return {
            user: this.currentUser,
            system: this.currentSystem
        }
    }

    public setUser(user: any) {
        this.currentUser = user;
    }

    public setSystem(system: any) {
        this.currentSystem = system;
    }

}
