import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ApplicationService} from "../../service/application/application.service";
import {MetricService} from "../../service/metric/metric.service";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
    moduleId: module.id,
    selector: 'metrics',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES],
    templateUrl: 'metrics.html',
    styleUrls: ['metrics.css'],
})

export class Metrics {

    public applications;
    public chartLegend: boolean = false;
    public chartType: string = 'line';

    public chartData = [];
    public chartLabels: Array<any> = [];

    public chartOptions: any = {
        animation: false,
        responsive: true
    };

    public chartData = [];
    public chartLabels = [];


    constructor(private _ApplicationService: ApplicationService, private _MetricService: MetricService) {

        _ApplicationService.getApplications().subscribe(data => {
            this.applications = data;
            console.info(this.applications);

            this.selectApplication(this.applications[0]._id)
        });

    }


    selectApplication(id) {
        console.log(id);

        this._MetricService.getLoadAvg(id).subscribe(data => {
            console.info(data);

            let result = this.processData(data, 'LoadAvg')

            this.chartData = result.data;
            this.chartLabels = result.labels
        })

    }

    processData(data: any, name: String) {

        var labels = [];
        var values = [];

        if (data[0].series) {
            for (var item of data[0].series[0].values) {

                let date = new Date(item[0]);
                labels.push(date.getHours() + ':' + date.getMinutes());
                values.push(item[1]);
            }
        } else {
            console.info('no data available');
        }

        var result = {
            data: values,
            labels: labels
        };

        console.info(result);
        return result;
    }


}
