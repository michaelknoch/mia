import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CostumerService {

    http;

    constructor(http: Http) {
        this.http = http;
    }

    getCostumer() {
        return this.http.get('dist/service/costumer/costumer.mock.json')
            .map(res => res.json())
    }

}
