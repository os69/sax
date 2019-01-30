/* global window, Viz, document, d3 */
define(['./core'], function (core) {


	var module = {};

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
		init: function (sourceNode, targetNode, description) {
			this.source = sourceNode;
			this.target = targetNode;
			this.id = sourceNode.id + '_' + targetNode.id;
			this.description = description || '';
		}
	});

	// =========================================================================
	// graph
	// =========================================================================	
	module.Graph = core.defineClass({
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
		createLink: function (sourceNode, targetNode, linkDescription) {
			var link = new Link(sourceNode, targetNode, linkDescription);
			this.links.push(link);
			return link;
		}
	});

	// =========================================================================
	// visualize a graph using graphviz
	// =========================================================================	
	module.VizGraphViewer = core.defineClass({
		init: function (graph, domNode) {
			this.graph = graph;
			this.domNode = domNode;
			this.draw();
		},
		draw: function () {
			var graphLinks = [];
			for (var i = 0; i < this.graph.links.length; ++i) {
				var link = this.graph.links[i];
				graphLinks.push(link.source.id + '->' + link.target.id + ' [label="' + link.description + '"]');
			}
			var graphNodes = [];
			for (var j = 0; j < this.graph.nodes.length; ++j) {
				var node = this.graph.nodes[j];
				graphNodes.push(node.id + ' [shape=box, label="' + node.description + '"]');
			}
			var graph = 'digraph G{\n' + graphLinks.join('\n') + '\n' + graphNodes.join('\n') + '\n}';
			var result = Viz(graph, 'svg', 'dot');
			this.domNode.innerHTML = result;
		}
	});

	// =========================================================================
	// visualize a graph using d3 force layout
	// =========================================================================	
	module.D3GraphViewer = core.defineClass({
		init: function (graph, domNode) {
			this.width = 1000;
			this.height = 600;
			this.graph = graph;
			this.domNode = domNode;
			this.draw();
		},
		draw: function () {

			// create svg area
			var self = this;
			this.svg = d3.select(this.domNode).append('svg')
				.attr('width', this.width)
				.attr('height', this.height);

			// assign random x,y coordinates to the nodes
			for (var i = 0; i < this.graph.nodes.length; ++i) {
				var node = this.graph.nodes[i];
				node.x = core.random(0, this.width - 1);
				node.y = core.random(0, this.height - 1);
			}

			// create d3 force
			this.force = d3.layout.force()
				.size([this.width, this.height])
				.linkDistance(40)
				.charge(-100)
				.gravity(0.05)
				.on('tick', function () {
					self.tick();
				});

			// draw links
			this.domLinks = this.svg.selectAll('.link').data(this.graph.links, function (d) {
				return d.id;
			});
			this.domLinks.exit().remove();
			this.domLinks.enter().insert('line', '.node')
				.attr('class', 'link')
				.attr('x1', function (d) {
					return d.source.x;
				})
				.attr('y1', function (d) {
					return d.source.y;
				})
				.attr('x2', function (d) {
					return d.target.x;
				})
				.attr('y2', function (d) {
					return d.target.y;
				});

			// draw nodes
			this.domNodes = this.svg.selectAll('.node').data(this.graph.nodes, function (d) {
				return d.id;
			});
			this.domNodes.exit().remove();
			this.domNodes.enter().append('circle')
				.attr('class', 'node')
				.attr('cx', function (d) {
					return d.x;
				})
				.attr('cy', function (d) {
					return d.y;
				})
				.attr('r', function (d) {
					return 5;
				}).call(this.force.drag);

			// start force
			this.force
				.nodes(this.graph.nodes)
				.links(this.graph.links)
				.start();
		},

		tick: function () {
			// links
			this.domLinks.attr('x1', function (d) {
				return d.source.x;
			})
				.attr('y1', function (d) {
					return d.source.y;
				})
				.attr('x2', function (d) {
					return d.target.x;
				})
				.attr('y2', function (d) {
					return d.target.y;
				});
			// nodes
			this.domNodes.attr('cx', function (d) {
				return d.x;
			})
				.attr('cy', function (d) {
					return d.y;
				});
		}

	});

	// =========================================================================
	// create a random graph
	// =========================================================================	
	module.createRandomGraph = function (numNodes, numLinks) {

		var graph = new module.Graph();

		// create nodes
		var nodes = [];
		for (var i = 0; i < numNodes; ++i) {
			var node = graph.createNode(i);
			nodes.push(node);
		}

		// create random links avoiding identical links
		var linkMap = {};
		for (var j = 0; j < numLinks; ++j) {
			var sourceNode = nodes[core.random(0, numNodes - 1)];
			var targetNode = nodes[core.random(0, numNodes - 1)];
			if (sourceNode == targetNode) {
				--j;
				continue;
			}
			var linkId = sourceNode.id + '_' + targetNode.id;
			var inverslinkId = targetNode.id + '_' + sourceNode.id;
			if (linkMap[linkId] || linkMap[inverslinkId]) {
				--j;
				continue;
			}
			graph.createLink(sourceNode, targetNode);
			linkMap[linkId] = true;
		}

		return graph;

	};

	// =========================================================================
	// create a simple graph
	// =========================================================================	
	module.createSimpleGraph = function () {
		var graph = new module.Graph();
		var nodeA = graph.createNode('A');
		var nodeB = graph.createNode('B');
		var nodeC = graph.createNode('C');
		graph.createLink(nodeA, nodeB);
		graph.createLink(nodeA, nodeC);
		return graph;
	};

	// =========================================================================
	// create a tree graph
	// =========================================================================	
	module.createTreeGraph = function (maxDepth, number) {

		var create = function (node, depth) {
			if (depth > maxDepth) {
				return;
			}
			for (var i = 0; i < number; ++i) {
				var child = graph.createNode(core.generateId());
				create(child, depth + 1);
				graph.createLink(node, child);
			}
		};

		var graph = new module.Graph();
		create(graph.createNode(core.generateId()), 0);

		return graph;
	};

	// =========================================================================
	// create a container with heading for displaying some content
	// =========================================================================		
	module.createContainer = function (title) {

		// create container
		var container = document.createElement('div');
		document.body.appendChild(container);

		// create heading
		var heading = document.createElement('h1');
		heading.appendChild(document.createTextNode(title));
		container.appendChild(heading);

		// create content container
		var content = document.createElement('div');
		container.appendChild(content);

		return content;
	};

	return module;
});