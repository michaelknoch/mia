import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {NgCytoscape} from "../ngCytoscape/ngCytoscape.comp";
import {GraphService} from "../../service/graph.service";

@Component({
    moduleId: module.id,
    selector: 'graph',
    directives: [ROUTER_DIRECTIVES, NgCytoscape],
    templateUrl: 'graph.html',
    styleUrls: ['graph.css'],
})

export class Graph {

    graphData = {
        nodes: [],
        edges: []
    };

    constructor(private _graphService: GraphService) {

        this._graphService.getGraph().subscribe(data => {
            this.graphData = this.processData(data);
            console.info(data);
        });

    }

    private processData(data) {
        var nodes = [];
        var edges = [];

        for (var node of data.nodes) {


            node.faveColor = 'black';
            node.faveShape = 'octagon';


            nodes.push({data: node})
        }

        for (var edge of data.edges) {
            edge.faveColor = 'white';
            edge.strength = 50;
            edge.label = edge.avgDuration + 'ms';
            edges.push({data: edge})
        }

        return {
            nodes: nodes,
            edges: edges
        }

    }

}
