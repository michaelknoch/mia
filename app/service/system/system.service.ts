import {Injectable} from '@angular/core';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";
import 'rxjs/add/operator/map';
import {UserService} from "../../../dist/service/user/user.service";

@Injectable()
export class SystemService {


    constructor(private http: Http, private _userService: UserService) {

    }

    getSystems() {
        return this.http.get(Config.BASEPATH + '/systems')
            .map(res => res.json())
    }

    selectSystem(id: String, name: String) {
        return this.http.post(Config.BASEPATH + '/systems/select/' + id, {})
            .map(res => {
                let data = res.json();
                this._userService.setSystem({id: data.newSystemId, name: name});
                return data;
            })
    }

    createSystem(name: String, description: String) {
        return this.http.post(Config.BASEPATH + '/systems', JSON.stringify({
                name: name,
                description: description
            }))
            .map(res => {
                let data = res.json();
                this._userService.setSystem({id: data._id, name: name});
                return data;
            })
    }

}