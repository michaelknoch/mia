import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../../app.config";
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Injectable()
export class UserService {

    @LocalStorage() private currentSystemId: string = '';
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
        return this.http.post(Config.BASEPATH + '/users/logout', undefined)
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
            systemId: this.currentSystemId
        }
    }

    public setUser(user: any) {
        debugger;
        this.currentUser = user;
    }

    public setSystem(systemId: string) {
        this.currentSystemId = systemId;
    }

}
