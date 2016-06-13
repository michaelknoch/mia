import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataService {

    private sharedData = [];

    constructor() {

    }

    getData(key: string) {
        return this.sharedData[key];
    }

    setData(key: string, obj) {
        this.sharedData[key] = obj;
    }

}

