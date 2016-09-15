/* global setTimeout, $ */

(function () {

	var rand = function (max) {
		return Math.floor((Math.random() * max));
	};


	var data = [];
	var getData = function () {
		if (data.length >= 11) {
			data.splice(0, 1);
		}
		var last = 5;
		if (data.length > 0) {
			last = data[data.length - 1];
		}
		var value = last + Math.floor(rand(11) - 5);
		if (value < 0) {
			value = 0;
		}
		data.push(value);
		var result = [];
		for (var i = 0; i < data.length; ++i) {
			result.push([i, data[i]]);
		}
		return result;
	};

	var plot = $.plot("#placeholder", [getData()], {
		grid: {

			backgroundColor: "black",
			borderColor: "white"
		},
		xaxis: {
			min: 0,
			max: 10,
			color: "white",
			font: {
				size: 21,
			},
			tickFormatter: function () {
				return "";
			}
		},
		yaxis: {
			min: 0,
			max: 30,
			color: "white",
			font: {
				size: 21,
			}
		},
		legend: {
			show: true
		}
	});

	var series = [{
		data: getData(),
		lines: {
			lineWidth: 5,
			fill: true,
			fillColor: 'rgba(0,255,0,0.4)'
		},
		color: 'rgba(0,255,0,0.5)'
	}];
	var updater = function () {
		series[0].data = getData();
		plot.setData(series);
		plot.draw();
		setTimeout(updater, 500);
	};

	updater();


})();