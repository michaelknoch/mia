import {ApplicationMetaPickerService} from "./applicationMetaPicker.service";
import {
    Component, OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef, Input,
    Output
} from '@angular/core';
import {LocalStorage, SessionStorage} from "angular2-localstorage/dist";

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

    private queries = {
        '7d': '7 days',
        '2d': '2 days',
        '1d': '1 day',
        '12h': '12 hours',
        '1h': '1 hour',
        '30m': '30 minutes',
        '15m': '15 minutes',
        '5m': '5 minutes'
    };

    queryKeys(): Array<string> {
        return Object.keys(this.queries);
    }

    @Output() public metaUpdate: EventEmitter<any> = new EventEmitter();

    @LocalStorage() private activePeriod: string;
    @LocalStorage() private activeApp: string;

    constructor(private _ApplicationMetaPickerService: ApplicationMetaPickerService) {

        this._ApplicationMetaPickerService.getApplications().subscribe(data => {

            let appToSelect: string = '';
            for (let app of data) {
                if (app._id === this.activeApp) {
                    appToSelect = this.activeApp;
                    break;
                }
            }

            this.selectApplication(appToSelect || data[0]._id);
            this.selectQuery(this.activePeriod);
            this.applications = data;
            this.emit()
        })
    }

    public selectQuery(query: string) {
        this.selectedQuery = query;
        this.activePeriod = query;
        this.emit()
    }

    public selectApplication(application) {
        this.selectedAppId = application;
        this.activeApp = application;
        this.emit();
    }

    private emit() {
        this.metaUpdate.emit({
            appId: this.selectedAppId,
            query: this.selectedQuery
        });
    }

}
