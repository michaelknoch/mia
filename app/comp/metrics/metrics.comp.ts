import {Component, OnInit} from '@angular/core'
import {ApplicationService} from "../../service/application/application.service";
import {MetricService} from "../../service/metric/metric.service";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {ApplicationMetaPicker} from "../applicationMetaPicker/applicationMetaPicker.comp";
import {UtilService} from "../../service/util.service";

@Component({
    moduleId: module.id,
    selector: 'metrics',
    directives: [CHART_DIRECTIVES, ApplicationMetaPicker],
    templateUrl: 'metrics.html',
    styleUrls: ['metrics.css'],
})

export class Metrics implements OnInit {

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

    public requestsCS = {
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

    public requestsSR = {
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


    constructor(private _ApplicationService: ApplicationService,
                private _MetricService: MetricService,
                private _utilService: UtilService) {
    }

    ngOnInit() {
        this._ApplicationService.getApplications().subscribe(data => {
            this.applications = data;
            console.info(this.applications);
            this.getData(this.applications[0]._id, undefined)
        });
    }


    getData(id: string, query: string) {
        console.log('Select Application:', id);
        this._MetricService.getMetrics(id, query).subscribe(data => {
            const loadData = this.processLoadData(data.load);
            this.loadAvg.chartData = loadData.data;
            this.loadAvg.chartLabels = loadData.labels;

            const memoryData = this.processMemoryData(data.memory);
            this.memory.chartData = memoryData.data;
            this.memory.chartLabels = memoryData.labels;

            const requestData = this.processRequestsData(data.requests);
            this.requestsCS.chartData = requestData.CS.data;
            this.requestsCS.chartLabels = requestData.CS.labels;
            this.requestsSR.chartData = requestData.SR.data;
            this.requestsSR.chartLabels = requestData.SR.labels;
        })
    }

    processLoadData(data: any) {

        let labels = [];
        let meanValues = [];
        let medianValues = [];

        if (data) {

            for (let item of data) {

                labels.push(this._utilService.dateFormat(item.time));
                meanValues.push(item.value_mean.toFixed(3));
                medianValues.push(item.value_median.toFixed(3));

            }

        } else {
            console.info('no data available');
        }

        let result = {
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
                labels.push(this._utilService.dateFormat(item.time));
                heapTotalvalues.push(item.heapTotal_mean.toFixed(3));
                heapUsedValues.push(item.heapUsed_mean.toFixed(3));
                rssValues.push(item.rss_mean.toFixed(3));

            }

        } else {
            console.info('no data available');
        }

        let result = {
            data: [
                {data: heapTotalvalues, label: 'Average Total Heap'},
                {data: heapUsedValues, label: 'Average Used Heap'},
                {data: rssValues, label: 'Resident Set Size'}
            ],
            labels: labels
        };

        return result;
    }

    processRequestsData(data: any) {

        let obj = {
            CS: {
                labels: [],
                duration_mean: [],
                duration_median: [],
                duration_percentile_95: [],
                duration_percentile_99: [],
            },
            SR: {
                labels: [],
                duration_mean: [],
                duration_median: [],
                duration_percentile_95: [],
                duration_percentile_99: [],
            }
        };

        if (data) {

            for (var item of data) {
                obj[item.type].labels.push(this._utilService.dateFormat(item.time));
                obj[item.type].duration_mean.push(item.duration_mean / 1000);
                obj[item.type].duration_median.push(item.duration_median / 1000);
                obj[item.type].duration_percentile_95.push(item.duration_percentile_95 / 1000);
                obj[item.type].duration_percentile_99.push(item.duration_percentile_99 / 1000);
            }

        } else {
            console.info('no data available');
        }

        let result = {

            CS: {
                data: [
                    {data: obj.CS.duration_mean, label: 'Duration Mean'},
                    {data: obj.CS.duration_median, label: 'Duration Median'},
                    {data: obj.CS.duration_percentile_95, label: 'duration_percentile_95'},
                    {data: obj.CS.duration_percentile_99, label: 'duration_percentile_99'}
                ],
                labels: obj.CS.labels
            },
            SR: {
                data: [
                    {data: obj.SR.duration_mean, label: 'Duration Mean'},
                    {data: obj.SR.duration_median, label: 'Duration Median'},
                    {data: obj.SR.duration_percentile_95, label: 'duration_percentile_95'},
                    {data: obj.SR.duration_percentile_99, label: 'duration_percentile_99'}
                ],
                labels: obj.SR.labels
            },
        };
        return result;
    }

    public metaUpdate(e: any) {
        this.getData(e.appId, e.query);
        console.log(e);
    }


}
