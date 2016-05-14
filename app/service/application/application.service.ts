import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../../app.config";

@Injectable()
export class SystemService {

    http;

    constructor(http: Http) {
        this.http = http;
    }

    getSystems() {
        return this.http.get(Config.BASEPATH + '/systems')
            .map(res => res.json())

        /*return this.http.get('dist/service/system/system.mock.json')
            .map(res => res.json())*/
    }

    selectSystem(id: String) {
        return this.http.get(Config.BASEPATH + '/systems/select/' + id)
            .map(res => res.json())
    }

    createSystem(name: String, description: String) {
        return this.http.post(Config.BASEPATH + '/systems', JSON.stringify({
                name: name,
                description: description
            }))
            .map(res => res.json())
    }

}
