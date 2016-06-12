import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../../app.config";
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Injectable()
export class UserService {

    @LocalStorage() private username: string = '';
    @LocalStorage() private currentSystem: string = '';

    constructor(private http: Http) {
    }

    login(mail: String, password: String) {
        return this.http.post(Config.BASEPATH + '/users/login', JSON.stringify({
                mail: mail,
                password: password
            }))
            .map(res => res.json())
    }

    logout() {
        return this.http.post(Config.BASEPATH + '/users/logout')
            .map(res => res.json())
    }

    register(mail: String, password: String, name: String, surname: String) {
        return this.http.post(Config.BASEPATH + '/users', JSON.stringify({
                mail: mail,
                password: password,
                name: name,
                surname: surname
            }))
            .map(res => res.json())
    }

    getLocalMe() {
        return {
            username: this.username,
            currentSystem: this.currentSystem
        }
    }

}
