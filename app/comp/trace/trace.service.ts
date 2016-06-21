import {Injectable} from '@angular/core';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";
import 'rxjs/add/operator/map';

@Injectable()
export class TraceService {

    constructor(private http: Http) {

    }

    getData(traceId: String) {
        return this.http.get(Config.BASEPATH + '/traces/' + traceId)
            .map(res => res.json())
    }


}

