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

    // global chart options
    public chartLegend: boolean = false;
    public chartType: string = 'line';
    public chartOptions: any = {
        animation: false,
        responsive: true
    };


    public loadAvg = {
        chartData: [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}],
        chartLabels: []
    };

    public memory = {
        chartData: [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}],
        chartLabels: []
    };


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

            let result = this.processLoadData(data, 'LoadAvg');
            this.loadAvg.chartData = result.data;
            this.loadAvg.chartLabels = result.labels

        });

        this._MetricService.getMemory(id).subscribe(data => {
            console.info(data);

            let result = this.processMemoryData(data);
            this.memory.chartData = result.data;
            this.memory.chartLabels = result.labels
        })

    }

    processLoadData(data: any, name: String) {

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
            data: [{
                data: values,
                label: name
            }],
            labels: labels
        };

        console.info(result);
        return result;
    }


    processMemoryData(data: any) {

        var labels = [];

        var heapTotalvalues = [];
        var heapUsedValues = [];
        var rssValues = [];

        if (data[0].series) {
            for (var item of data[0].series[0].values) {

                let date = new Date(item[0]);
                labels.push(date.getHours() + ':' + date.getMinutes());


                heapTotalvalues.push(item[2]);
                heapUsedValues.push(item[3]);
                rssValues.push(item[4]);

            }
        } else {
            console.info('no data available');
        }

        var result = {
            data: [
                {data: heapTotalvalues, label: 'heapTotal'},
                {data: heapUsedValues, label: 'heapUsed'},
                {data: rssValues, label: 'rss'}
            ],
            labels: labels
        };

        console.info(result);
        return result;
    }

}
