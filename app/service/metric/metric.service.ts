import {Injectable} from '@angular/core';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../../app.config";
import 'rxjs/add/operator/map';

@Injectable()
export class MetricService {

    constructor(private http: Http) {

    }

    getLoadAvg(id: string) {
        return this.http.get(Config.BASEPATH + '/metrics/applications/' + id + '/loadavg?aggregate_fn=mean&group_by_value=5&group_by_unit=m&period=3h')
            .map(res => res.json())
    }

    getMemory(id: string) {
        return this.http.get(Config.BASEPATH + '/metrics/applications/' + id + '/memory?aggregate_fn=mean&group_by_value=5&group_by_unit=m&period=3h')
            .map(res => res.json())
    }

    getMetrics(id: string, query: string) {
        var _query = query || '?since=1h';
        return this.http.get(Config.BASEPATH + '/metrics/applications/' + id + _query)
            .map(res => res.json())
    }


}
