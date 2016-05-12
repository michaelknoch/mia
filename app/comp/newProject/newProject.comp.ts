import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SystemService} from "../../service/system/system.service";
import {Router} from "@angular/router";
import {SystemService} from "../../service/system/system.service";


@Component({
    moduleId: module.id,
    selector: 'new-project',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'newProject.html',
    styleUrls: ['newProject.css']
})

export class NewProject {

    mail: string;
    name: string;
    url: string;

    address = {
        street: '',
        number: '',
        plz: '',
        city: ''
    };

    constructor(private _systemService: SystemService, private _router: Router) {
    }

    newCompany() {
        this._systemService.createSystem(this.mail, this.name, this.url, this.address).subscribe(
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
