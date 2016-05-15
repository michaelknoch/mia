import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {ApplicationService} from "../../service/application/application.service";

@Component({
    moduleId: module.id,
    selector: 'new-application',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'newApplication.html',
    styleUrls: ['newApplication.css'],
})

export class NewApplication {

    name: String;
    description: String;

    constructor(private _ApplicationService: ApplicationService, private _router: Router) {

    }

    newApplication() {
        this._ApplicationService.createApplication(this.name, this.description).subscribe(
            data => {
                console.info('create company success');
                this._router.navigate(['Applications']);
            },
            err => console.info(err)
        )
    }

    err(msg) {
        console.error(msg);
    }

}
