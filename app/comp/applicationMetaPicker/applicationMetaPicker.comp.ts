import {ApplicationMetaPickerService} from "./applicationMetaPicker.service";
import {
    Component, OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef, Input,
    Output
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'application-meta-picker',
    templateUrl: 'applicationMetaPicker.html',
    styleUrls: ['applicationMetaPicker.css'],
})

export class ApplicationMetaPicker {

    public applications;
    private selectedAppId: String;
    private selectedQuery: String;


    @Output() public metaUpdate: EventEmitter<any> = new EventEmitter();

    constructor(private _ApplicationMetaPickerService: ApplicationMetaPickerService) {
        this._ApplicationMetaPickerService.getApplications().subscribe(data => {
            this.selectApplication(data[0]._id);
            this.applications = data;
        })
    }

    public selectQuery(query: String) {
        this.selectedQuery = query;
        this.emit()
    }

    public selectApplication(id) {
        this.selectedAppId = id;
        this.emit();
    }

    private emit() {
        this.metaUpdate.emit({
            appId: this.selectedAppId,
            query: this.selectedQuery
        });
    }

}
