import {MetaPickerService} from "./metaPicker.service";
import {
    Component, OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef, Input,
    Output
} from '@angular/core';
import {LocalStorage, SessionStorage} from "angular2-localstorage/dist";

@Component({
    moduleId: module.id,
    selector: 'meta-picker',
    templateUrl: 'metaPicker.html',
    styleUrls: ['metaPicker.css'],
})

export class MetaPicker implements OnInit {

    @Input() public hideApplication: boolean = false;
    @Output() public metaUpdate: EventEmitter<any> = new EventEmitter();

    private applications;

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

    constructor(private _metaPickerService: MetaPickerService) {

    }

    ngOnInit() {
        this._metaPickerService.getApplications().subscribe(data => {

            let appToSelect: string = '';
            for (let app of data) {
                if (app._id === this._metaPickerService.activeApp) {
                    appToSelect = this._metaPickerService.activeApp;
                    break;
                }
            }
            this._metaPickerService.activeApp = appToSelect || data[0]._id;
            this.applications = data;
            this.emit()
        })
    }

    public selectQuery(query: string) {
        this._metaPickerService.activePeriod = query;
        this.emit()
    }

    public selectApplication(application) {
        this._metaPickerService.activeApp = application;
        this.emit();
    }

    private emit() {
        console.info('emit!');
        this.metaUpdate.emit({
            appId: this._metaPickerService.activeApp,
            query: this._metaPickerService.activePeriod
        });
    }

}
