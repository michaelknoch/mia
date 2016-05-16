import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ApplicationService} from "../../service/application/application.service";
import {MetricService} from "../../service/metric/metric.service";
import {CHART_DIRECTIVES} from '../chartJS/charts';

@Component({
    moduleId: module.id,
    selector: 'metrics',
    directives: [ROUTER_DIRECTIVES, CHART_DIRECTIVES],
    templateUrl: 'metrics.html',
    styleUrls: ['metrics.css'],
})

export class Metrics {

    applications;
    chartData;


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
            this.chartData = this.processData(data, 'LoadAvg');

        })

    }

    processData(data: any, name: String) {

        var labels = [];
        var values = [];

        for (var item of data[0].series[0].values) {
            labels.push(item[0]);
            values.push(item[1]);
        }

        var result = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: name,
                    data: values,
                    borderColor: "rgba(75,192,192,1)",
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        };

        console.info(result);
        return result;
    }


}
