import {Component} from '@angular/core';
import {NgCytoscape} from "ng2-cytoscape/dist";
import {GraphService} from "./graph.service";
import {Loading} from "../loading/loading.comp";
import {MetaPicker} from "../metaPicker/metaPicker.comp";

declare var cytoscape: any;

@Component({
    moduleId: module.id,
    selector: 'graph',
    directives: [NgCytoscape, MetaPicker, Loading],
    templateUrl: 'graph.html',
    styleUrls: ['graph.css'],
})

export class Graph {

    graphData = {
        nodes: [],
        edges: []
    };

    layout = {
        name: 'breadthfirst',
        directed: true,
        padding: 0
    };

    private loading: boolean;

    constructor(private _graphService: GraphService) {
        this.getData(undefined);
    }

    getData(query: String) {
        this.loading = true;
        this._graphService.getGraph(query).subscribe(data => {
            this.graphData = this.processData(data);
            this.loading = false;
            console.info(this.graphData);
        });
    }

    private processData(data) {
        var nodes = [];
        var edges = [];

        for (var node of data.nodes) {
            node.faveColor = 'whitesmoke';
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
                edge.faveColor = '#e74c3c';
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

    public metaUpdate(e: any) {
        this.getData(e.query);
        console.log(e);
    }

}
