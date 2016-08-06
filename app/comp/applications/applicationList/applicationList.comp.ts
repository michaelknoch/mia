import {Component, ViewChild} from '@angular/core'
import {ApplicationService} from '../application.service';
import {NewApplicationModal} from '../../applications/newApplicationModal/newApplicationModal.comp';
import {LocalStorage} from "angular2-localstorage/dist";
import {CHART_DIRECTIVES} from "ng2-charts/ng2-charts";
import {BaseChartComponent} from "ng2-charts/ng2-charts";
import {UtilService} from "../../../sharedServices/util.service";
import {MetricService} from "../../../sharedServices/metric.service";
declare var moment: any;

@Component({
    moduleId: module.id,
    selector: 'application-list',
    directives: [NewApplicationModal, CHART_DIRECTIVES],
    templateUrl: 'applicationList.html',
    styleUrls: ['applicationList.css']
})

export class ApplicationList {
    private chart = {
        options: {
            animation: false,
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        min: 0,
                        stepSize: 1
                    }
                }]
            }
        },
        data: [{data: [], label: 'running Apps'}],
        labels: [],
    };

    private applications = [];
    @LocalStorage() private hideTokenExample: boolean;
    @ViewChild(NewApplicationModal) private _newApplicationModal;
    @ViewChild(BaseChartComponent) private _chart;

    constructor(private _ApplicationService: ApplicationService,
                private _utilService: UtilService,
                private _metricSerice: MetricService) {

        this.getData()
    }

    getData() {

        this._ApplicationService.getApplications().subscribe(
            data => {
                this.applications = data;
                console.info(data);
                /*this.chart.data[0].data.push(this.getActiveAppCount(data));
                this.chart.labels.push(this._utilService.realDateFormat(new Date()));
                this.chart.options.scales.yAxes[0].ticks = {min: 0, stepSize: 1};
                this._chart.ngOnChanges();*/
            },
            err => console.error(err)
        );
    }

    private getActiveAppCount(data: any) {
        let count = 0;
        for (let app of data) {

            let date = new Date(app.last_mem_data);
            let now = new Date();

            if ((now.getTime() - date.getTime()) < 30000) {
                count++;
            }
        }
        return count;
    }

    update(data: any) {
        console.info(data);
        this.getData()
    }

    getApplicationStatus(isoString: string) {
        let date = new Date(isoString);
        let now = new Date();
        let status: string = ((now.getTime() - date.getTime()) > 30000) ? 'red' : 'green';

        return {
            status: status,
            moment: moment(date).fromNow()
        }
    }

    copyToken(element: any) {
        let _elem = element.currentTarget.childNodes[1];
        if (_elem) {
            _elem.select();
        }
        document.execCommand('copy');
    }

    prepareToken(token: string) {
        let string = "require('shimmingtest').start({\n\t'app_token': '" + token + "'\n});";
        return string;
    }

}
