import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../app.config";


@Injectable()
export class GraphService {

    constructor(private http: Http) {

    }

    getGraph(query: String) {
        var _query = query || '?since=1h';
        // TODO: remove this when @timoweiss is ready for it
        _query = '?from=1464006214519';

        return this.http.get(Config.BASEPATH + '/graphs' + _query)
            .map(res => res.json())
    }


}