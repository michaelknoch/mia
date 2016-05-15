import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SystemService} from "../../service/system/system.service";
import {Router} from "@angular/router-deprecated";


@Component({
    moduleId: module.id,
    selector: 'new-project',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'newSystem.html',
    styleUrls: ['newSystem.css']
})

export class NewSystem {


    name: string;
    description: string;

    constructor(private _systemService: SystemService, private _router: Router) {
    }

    newSystem() {
        this._systemService.createSystem(this.name, this.description).subscribe(
            data => {
                console.info('create company success');
                this._router.navigate(['System-list']);
            },
            err => this.err(err)
        )
    }

    err(msg) {
        console.error(msg);
    }

}
