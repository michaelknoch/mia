import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router';
import {CompanyService} from "../../service/company/company.service";
import {Router} from "@angular/router";


@Component({
    moduleId: module.id,
    selector: 'new-company',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'newCompany.html',
    styleUrls: ['newCompany.css']
})

export class NewCompany {

    mail: string;
    name: string;
    url: string;

    address = {
        street: '',
        number: '',
        plz: '',
        city: ''
    };

    constructor(private companyService: CompanyService, private _router: Router) {
    }

    newCompany() {
        this.companyService.createCompanie(this.mail, this.name, this.url, this.address).subscribe(
            data => {
                console.info('create company success');
                this._router.navigate(['CompanyList']);
            },
            err => this.err(err)
        )
    }

    err(msg) {
        console.error(msg);
    }

}
