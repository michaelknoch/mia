
import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../../app.config";

@Injectable()
export class ApplicationService {

    http;

    constructor(http: Http) {
        this.http = http;
    }

    getApplication() {
        return this.http.get(Config.BASEPATH + '/applications')
            .map(res => res.json())
    }

    createApplication (name: String, description: String) {
        return this.http.post(Config.BASEPATH + '/applications', JSON.stringify({
                name: name,
                description: description
            }))
            .map(res => res.json())
    }

}
