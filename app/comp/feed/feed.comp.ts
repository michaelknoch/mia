import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MetricService} from "../../service/metric/metric.service";
import {ApplicationMetaPicker} from "../applicationMetaPicker/applicationMetaPicker.comp";

declare var moment;

@Component({
    moduleId: module.id,
    selector: 'feed',
    directives: [ROUTER_DIRECTIVES, ApplicationMetaPicker],
    templateUrl: 'feed.html',
    styleUrls: ['feed.css'],
})

export class Feed {

    private startStops = [];

    constructor(private _metricService: MetricService) {

    }

    private getData(appId: string, query: string) {
        this._metricService.getMetrics(appId, query).subscribe((data: any) => {
            this.startStops = data.startStop;
            console.info(this.startStops);
        });
    }

    public metaUpdate(e: any) {
        this.getData(e.appId, e.query);
        console.log(e);
    }

    private getMoment(isoDate: string) {
        return moment(new Date(isoDate)).format('MMMM Do YYYY, h:mm:ss a')
    }

}
