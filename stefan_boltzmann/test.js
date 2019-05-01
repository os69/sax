define(['./core/core'], function (core) {

    var bk = function (n, k) {
        if (k === 0) {
            return 1;
        }
        if (2 * k > n) {
            k = n - k;
        }
        var result = 1;
        for (var i = 1; i <= k; ++i) {
            result = result * (n - k + i) / i;
        }
        return result;
    };

    var binomial = function (n, p) {
        var q = 1 - p;
        var data = [];
        for (var k = 0; k <= n; ++k) {
            var w = bk(n, k) * Math.pow(p, k) * Math.pow(q, n - k);
            data.push({ x: k, y: w });
        }
        return data;
    };

    var normalize = function (data) {
        var result = [];
        var maxY = 0;
        var i;
        for (i = 0; i < data.length; ++i) {
            var point = data[i];
            maxY = Math.max(maxY, point.y);
        }
        for (i = 0; i < data.length; ++i) {
            var point = data[i];
            result.push({ x: point.x, y: point.y / maxY });
        }
        return result;
    };

    var particles = 100;
    var totalEnergy = 1000;
    var deltaEnergy = 1;

    var meanEnergy = totalEnergy / particles;

    var energy1 = function () {
        var n = totalEnergy / deltaEnergy;
        var p = 1 / particles;
        var q = 1 - p;
        return binomial(n, p);
    };

    var energy2 = function () {
        var n = totalEnergy / deltaEnergy;
        var result = [];
        for (var i = 0; i <= n; ++i) {
            var w =Math.sqrt(i*deltaEnergy)* Math.exp(-i*deltaEnergy/meanEnergy);
            result.push({ x: i, y: w });
        }
        return result;
    };

    var chartCanvas = document.createElement('canvas');
    document.body.appendChild(chartCanvas);

    var chart = new Chart(chartCanvas, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'blub1',
                showLine: true,
                fill: false,
                data: normalize(energy1()),
                borderColor: 'red'
            }, {
                label: 'blub2',
                showLine: true,
                fill: false,
                data: normalize(energy2()),
                borderColor: 'blue'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'X',
                    },
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Y'
                    }
                }]
            }
        }
    });




});