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
            console.info(this.graphData);
        });

    }

    private processData(data) {
        var nodes = [];
        var edges = [];

        for (var node of data.nodes) {
            node.faveColor = '#24506b';
            nodes.push({
                data: node, position: {x: 1, y: 1}
            });
        }


        var maxRequests = 0;
        for (let edge of data.edges) {
            maxRequests = (edge.requests > maxRequests) ? edge.requests : maxRequests
        }

        for (let edge of data.edges) {

            edge.faveColor = '#27ae60';

            if (edge.avgDuration > 1000) {
                edge.faveColor = '#c0392b';
            } else if (edge.avgDuration > 100) {
                edge.faveColor = '#e67e22';
            }

            edge.strength = (100 / maxRequests) * edge.requests;
            edge.label = edge.avgDuration + 'ms';
            edges.push({data: edge});
        }

        return {
            nodes: nodes,
            edges: edges
        }

    }

}
