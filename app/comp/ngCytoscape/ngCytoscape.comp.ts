import {
    Component, OnDestroy, OnInit, OnChanges, EventEmitter, ElementRef, Input,
    Output
} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'ng-cytoscape',
    template: '<div id="cy"></div>',
    styleUrls: ['ngCytoscape.css'],
})


export class NgCytoscape implements OnChanges {

    @Input() public elements: any;

    public constructor() {
    }

    public ngOnChanges(): any {
        this.render();
    }

    public render() {

        $('#cy').cytoscape({
            layout: {
                name: 'cose',
                padding: 10
            },

            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'shape': 'data(faveShape)',
                    'width': 'mapData(weight, 40, 80, 20, 60)',
                    'content': 'data(name)',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'text-outline-color': 'data(faveColor)',
                    'background-color': 'data(faveColor)',
                    'color': '#fff'
                })
                .selector(':selected')
                .css({
                    'border-width': 3,
                    'border-color': '#333'
                })
                .selector('edge')
                .css({
                    'curve-style': 'bezier',
                    'opacity': 0.666,
                    'width': 'mapData(strength, 70, 100, 2, 6)',
                    'target-arrow-shape': 'triangle',
                    'source-arrow-shape': 'circle',
                    'line-color': 'data(faveColor)',
                    'source-arrow-color': 'data(faveColor)',
                    'target-arrow-color': 'data(faveColor)'
                })
                .selector('edge.questionable')
                .css({
                    'line-style': 'dotted',
                    'target-arrow-shape': 'diamond'
                })
                .selector('.faded')
                .css({
                    'opacity': 0.25,
                    'text-opacity': 0
                }),

            elements: this.elements,

        });
    }

}
