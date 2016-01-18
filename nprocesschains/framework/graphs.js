/* global require, module */


// =========================================================================
// import other modules + define own module
// =========================================================================
var core = require('./core');
var fs = require('fs');
var exports = module.exports = {};

// =========================================================================
// node of a graph
// =========================================================================	
var Node = core.defineClass({
	init: function (id, description) {
		this.id = id;
		this.description = description || '';
	}
});

// =========================================================================
// directed link which connects two nodes
// =========================================================================	
var Link = core.defineClass({
	init: function (sourceNode, targetNode, type) {
		this.source = sourceNode;
		this.target = targetNode;
		this.type = type || '';
	}
});

// =========================================================================
// graph
// =========================================================================	
exports.Graph = core.defineClass({
	init: function () {
		this.links = [];
		this.nodes = [];
		this.nodesMap = {};
	},
	createNode: function (id, description) {
		var node = this.nodesMap[id];
		if (node) {
			return node;
		}
		node = new Node(id, description);
		this.nodes.push(node);
		this.nodesMap[id] = node;
		return node;
	},
	getNode: function (id) {
		return this.nodesMap[id];
	},
	createLink: function (sourceNode, targetNode, type) {
		var link = new Link(sourceNode, targetNode, type);
		this.links.push(link);
		return link;
	}
});

// =========================================================================
// visualize a graph using graphviz
// =========================================================================	
exports.VizGraph = core.defineClass({
	init: function (graph) {
		this.graph = graph;
	},
	toString: function () {
		var graphLinks = [];
		for (var i = 0; i < this.graph.links.length; ++i) {
			var link = this.graph.links[i];
			graphLinks.push(link.source.id + '->' + link.target.id + ' [label=' + link.type + ']');
		}
		var graphNodes = [];
		for (var j = 0; j < this.graph.nodes.length; ++j) {
			var node = this.graph.nodes[j];
			graphNodes.push(node.id + ' [label="' + node.id + ' ' + node.description + '"]');
		}
		var graph = 'digraph G{\n' + graphLinks.join('\n') + '\n' + graphNodes.join('\n') + '\n}';
		return graph;
	},
	save: function (path, cb) {
		fs.writeFile(path, this.toString(), cb);
	}
});