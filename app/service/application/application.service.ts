import {Injectable} from '@angular/core';
import {Http,Response, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationService {

    constructor(private http: Http) {
    }

    getApplicationsPolling() {
        return Observable.timer(0, 5000)
            .switchMap(() => this.http.get(Config.BASEPATH + '/applications')
                .map(response => response.json()))
    }

    getApplications() {
        return this.http.get(Config.BASEPATH + '/applications')
            .map(response => response.json())
    }

    createApplication(name: String, description: String) {
        return this.http.post(Config.BASEPATH + '/applications', JSON.stringify({
                name: name,
                description: description
            }))
            .map(res => res.json())
    }

}
