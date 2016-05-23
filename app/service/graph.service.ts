import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../app.config";


@Injectable()
export class GraphService {

    constructor(private http: Http) {

    }

    getGraph() {
        return this.http.get(Config.BASEPATH + '/graphs?from=1464006214519')
            .map(res => res.json())
    }


}