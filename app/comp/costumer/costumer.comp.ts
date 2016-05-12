import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CostumerService} from "../../service/costumer/costumer.service";

@Component({
    moduleId: module.id,
    selector: 'costumer',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'costumer.html',
    styleUrls: ['costumer.css'],
    bindings: [CostumerService],
})

export class Costumer {

    costumer;

    constructor(private _costumerService: CostumerService) {

        _costumerService.getCostumer().subscribe(
            data => {
                this.costumer = data;
                console.info(data);
            },
            err => console.error(err)
        );
    }

}
