import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SystemService} from "../../service/system/system.service";
import {Router} from "@angular/router-deprecated";
import {DataService} from "../../service/data.service";

@Component({
    moduleId: module.id,
    selector: 'project-list',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'systemList.html',
    styleUrls: ['systemList.css'],
})

export class SystemList {

    systems;

    constructor(private _systemService: SystemService, private _router: Router, private _dataService: DataService) {
        _systemService.getSystems().subscribe(
            data => {
                this.systems = data;
                console.info(data);
            },
            err => console.error(err)
        );
    }

    selectSystem(company) {
        this._systemService.selectSystem(company._id).subscribe(data => {
            this._dataService.setData('current-company', company);
            console.info('select company', data);
            this._router.navigate(['Root'])
        });
    }

}
