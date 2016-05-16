import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../../app.config";

@Injectable()
export class MetricService {

    constructor(private http: Http) {

    }

    getLoadAvg(id: String) {
        return this.http.get(Config.BASEPATH + '/metrics/applications/' + id + '/loadavg')
            .map(res => res.json())
    }

    getMemory(id: String) {
        return this.http.get(Config.BASEPATH + '/metrics/applications/' + id + '/memory')
            .map(res => res.json())
    }


}
