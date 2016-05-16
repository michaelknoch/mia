import {
    Component, OnDestroy, OnInit, OnChanges,
    EventEmitter, ElementRef, Input, HostBinding
} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

declare var Chart: any;

@Component({
    selector: 'chart',
    template: `<canvas></canvas>`,
    directives: [CORE_DIRECTIVES, NgClass]
})
export class ChartsComponent {
}

@Component({
    selector: 'base-chart',
    template: `
  <canvas id="myChart" width="600px" height="400px"></canvas>
  `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass]
})
export class BaseChartComponent implements OnDestroy, OnChanges, OnInit {
    @Input() public data: Array<any> = [];
    @Input() public labels: Array<any> = [];
    @Input() public options: any = {responsive: true};
    @Input() public chartType: string;

    private ctx: any;
    private cvs: any;
    private parent: any;
    private chart: any;
    private legendTemplate: any;
    private initFlag: boolean = false;


    private element: ElementRef;

    public constructor(element: ElementRef) {
        this.element = element;
    }

    public ngOnInit(): any {

        this.ctx = this.element.nativeElement.children[0];
        console.info(this.ctx);


        this.cvs = this.element.nativeElement.children[0];
        this.parent = this.element.nativeElement;
        this.initFlag = true;

        console.log(this.data)
        if (this.data) {
            this.refresh();
        }
    }

    public ngOnChanges(): any {
        console.log(this.data);
        if (this.initFlag) {
            this.refresh();
        }
    }

    public ngOnDestroy(): any {
        if (this.chart) {
            this.chart.destroy();
            this.chart = void 0;
        }
        if (this.legendTemplate) {
            this.legendTemplate.destroy();
            this.legendTemplate = void 0;
        }
    }

    public getChartBuilder(ctx: any, data: Array<any>, options: any): any {
        /* let opts = options;
         opts.data = data;
         opts.type = this.chartType; */
        return new Chart(ctx, this.data);
    }

    public getDataObject(label: string, value: any): any {
        if (this.chartType === 'line'
            || this.chartType === 'bar'
            || this.chartType === 'radar') {
            return {
                label: label,
                data: value
            };
        }

        if (this.chartType === 'pie'
            || this.chartType === 'doughnut'
            || this.chartType === 'polarArea') {
            return {
                label: label,
                value: value
            };
        }

        return void 0;
    }

    public getChartData(labels: any, dataObject: any): any {
        if (this.chartType === 'line'
            || this.chartType === 'bar'
            || this.chartType === 'radar') {
            return {
                labels: labels,
                datasets: dataObject
            };
        }
        if (this.chartType === 'pie'
            || this.chartType === 'doughnut'
            || this.chartType === 'polarArea') {
            return dataObject;
        }
    }

    private refresh(): any {

        /*if (this.options.responsive && this.parent.clientHeight === 0) {
         return setTimeout(() => this.refresh(), 50);
         }


         this.ngOnDestroy();
         let dataset:Array<any> = [];

         for (let i = 0; i < this.data.length; i++) {
         //let colourDesc:Array<number> = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
         //let colour = i < this.colours.length ? this.colours[i] : this.defaultsColours[i] || this.getColour(colourDesc);

         //let data:any = Object.assign(colour,
         //this.getDataObject(this.series[i] || this.labels[i], this.data[i]));

         dataset.push(data);
         }

         let data:any = this.getChartData(this.labels, dataset);
         */

        let data = 'yo';
        this.chart = this.getChartBuilder(this.ctx, data, this.options);


    }
}

export const CHART_DIRECTIVES: Array<any> = [ChartsComponent, BaseChartComponent];
