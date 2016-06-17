import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";

@Injectable()
export class ApplicationMetaPickerService {
    
    constructor(private http: Http) {
    }

    getApplications() {
        return this.http.get(Config.BASEPATH + '/applications')
            .map(res => res.json())
    }

}
