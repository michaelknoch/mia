import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";
import {LocalStorage} from "angular2-localstorage/dist";

@Injectable()
export class ApplicationMetaPickerService {

    @LocalStorage() public activePeriod: string;
    @LocalStorage() public activeApp: string;

    constructor(private http: Http) {
    }

    getApplications() {
        return this.http.get(Config.BASEPATH + '/applications')
            .map(res => res.json())
    }

}
