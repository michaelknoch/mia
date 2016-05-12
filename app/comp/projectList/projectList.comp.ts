import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router';
import {CompanyService} from "../../service/company/company.service";
import {Router} from "@angular/router";
import {DataService} from "../../service/data.service";

@Component({
    moduleId: module.id,
    selector: 'company-list',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'companyList.html',
    styleUrls: ['companyList.css'],
})

export class CompanyList {

    companies;

    constructor(private companyService: CompanyService, private _router: Router, private _dataService: DataService) {
        companyService.getCompanies().subscribe(
            data => {
                this.companies = data;
                console.info(data);
            },
            err => console.error(err)
        );
    }

    selectCompany(company) {
        this.companyService.selectCompany(company._id).subscribe(data => {
            this._dataService.setData('current-company', company);
            console.info('select company', data);
            this._router.navigate(['Root'])
        });
    }

}
