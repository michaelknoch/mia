import {Injectable} from '@angular/core';
import {Http, Response,  HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Config} from "../app.config";
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {

    constructor(private http: Http) {
    }

    getGraph(query: String) {
        var _query = query || '?since=1h';

        return this.http.get(Config.BASEPATH + '/graphs' + _query)
            .map(res => res.json())
    }


}