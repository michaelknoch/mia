import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Config} from "../../app.config";

@Injectable()
export class CompanyService {

    http;

    constructor(http: Http) {
        this.http = http;
    }

    getCompanies() {
        return this.http.get(Config.BASEPATH + '/companies')
            .map(res => res.json())
    }

    selectCompany(id: String) {
        return this.http.get(Config.BASEPATH + '/companies/select/' + id)
            .map(res => res.json())
    }

    createCompanie(mail: String, name: String, url: String, address: any) {
        return this.http.post(Config.BASEPATH + '/companies', JSON.stringify({
                mail: mail,
                name: name,
                url: url,
                address: address
            }))
            .map(res => res.json())
    }

}
