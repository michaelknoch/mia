import {Component} from '@angular/core'
import {ApplicationService} from "../../service/application/application.service";
import {MetricService} from "../../service/metric/metric.service";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {ApplicationMetaPicker} from "../applicationMetaPicker/applicationMetaPicker.comp";

@Component({
    moduleId: module.id,
    selector: 'metrics',
    directives: [CHART_DIRECTIVES, ApplicationMetaPicker],
    templateUrl: 'metrics.html',
    styleUrls: ['metrics.css'],
})

export class Metrics {

    public applications;

    // global chart options
    public chartLegend: boolean = false;
    public chartType: string = 'line';


    public loadAvg = {
        chartData: [{data: [], label: 'Series A'}],
        chartLabels: [],
        chartOptions: {
            animation: false,
            responsive: true,
            scales: {
                xAxes: [{
                    position: 'bottom',
                    ticks: {
                        maxRotation: 0
                    }
                }]
            }
        }
    };

    public memory = {
        chartData: [{data: [], label: 'Series A'}],
        chartLabels: [],
        chartOptions: {
            scaleShowVerticalLines: false,
            animation: false,
            responsive: true,
            scales: {
                xAxes: [{
                    position: 'bottom',
                    ticks: {
                        maxRotation: 0
                    }
                }]
            }
        }
    };


    constructor(private _ApplicationService: ApplicationService, private _MetricService: MetricService) {

        _ApplicationService.getApplications().subscribe(data => {
            this.applications = data;
            console.info(this.applications);
            this.getData(this.applications[0]._id, undefined)
        });

    }


    getData(id: String, query: string) {
        console.log('Select Application:', id);
        this._MetricService.getMetrics(id, query).subscribe(data => {
            const loadData = this.processLoadData(data.load);
            this.loadAvg.chartData = loadData.data;
            this.loadAvg.chartLabels = loadData.labels;


            const memoryData = this.processMemoryData(data.memory);
            this.memory.chartData = memoryData.data;
            this.memory.chartLabels = memoryData.labels;
        })
    }

    processLoadData(data: any) {

        let labels = [];
        let meanValues = [];
        let medianValues = [];

        if (data) {

            for (let item of data) {

                labels.push(this.dateFormat(item.time));
                meanValues.push(item.value_mean.toFixed(3));
                medianValues.push(item.value_median.toFixed(3));

            }

        } else {
            console.info('no data available');
        }

        var result = {
            data: [
                {data: meanValues, label: 'Average Load'},
                {data: medianValues, label: 'Median Load'}
            ],
            labels: labels
        };

        return result;
    }


    processMemoryData(data: any) {

        var labels = [];

        var heapTotalvalues = [];
        var heapUsedValues = [];
        var rssValues = [];

        if (data) {

            for (var item of data) {
                labels.push(this.dateFormat(item.time));
                heapTotalvalues.push(item.heapTotal_mean.toFixed(3));
                heapUsedValues.push(item.heapUsed_mean.toFixed(3));
                rssValues.push(item.rss_mean.toFixed(3));

            }

        } else {
            console.info('no data available');
        }

        var result = {
            data: [
                {data: heapTotalvalues, label: 'Average Total Heap'},
                {data: heapUsedValues, label: 'Average Used Heap'},
                {data: rssValues, label: 'Resident Set Size'}
            ],
            labels: labels
        };

        console.info(result);
        return result;
    }

    dateFormat(isoDate: string) {
        let date = new Date(isoDate);
        return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    }

    public metaUpdate(e: any) {
        this.getData(e.appId, e.query);
        console.log(e);
    }


}
