import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CostumerService} from "../../service/costumer/costumer.service";

@Component({
    moduleId: module.id,
    selector: 'costumer',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'applicationList.html',
    styleUrls: ['applicationList.css'],
    bindings: [CostumerService],
})

export class ApplicationList {

    applications;

    constructor(private _costumerService: CostumerService) {

        _costumerService.getCostumer().subscribe(
            data => {
                this.applications = data;
                console.info(data);
            },
            err => console.error(err)
        );
    }

}
