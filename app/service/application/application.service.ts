import {Injectable} from '@angular/core';
import {Http,Response, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationService {

    http;

    constructor(http: Http) {
        this.http = http;
    }

    getApplications() {
        return this.http.get(Config.BASEPATH + '/applications')
            .map((res: Response) => res.json())
    }

    createApplication(name: String, description: String) {
        return this.http.post(Config.BASEPATH + '/applications', JSON.stringify({
                name: name,
                description: description
            }))
            .map(res => res.json())
    }

}
