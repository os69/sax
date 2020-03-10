define(['../../../../src/index'], function (tt) {

    var module = {

        createTtNode: tt.createTtNodeCreator({
            init: function (params) {
                params.minutes = params.minutes || 0;
                this.duration = params.minutes * 60 + params.seconds;
                tt.initProperty(this, 'displayTime');
                tt.initProperty(this, 'status');
                this.finished = params.finished;
                this.reset();
            },
            reset: function () {
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                this.setStatus('initial');
                this.pauseTime = 0;
                this.updateDisplay(this.duration);
            },
            toggle: function () {
                this.update();
                switch (this.getStatus()) {
                    case 'initial':
                        this.startTime = this.getCurrentTime();
                        this.updateInterval = window.setInterval(this.update.bind(this), 100);
                        this.setStatus('running');
                        break;
                    case 'running':
                        this.pauseStart = this.getCurrentTime();
                        this.setStatus('paused');
                        break;
                    case 'paused':
                        this.pauseTime += this.getCurrentTime() - this.pauseStart;
                        this.setStatus('running');
                        break;
                    case 'finished':
                        break;
                }
            },
            getCurrentTime: function () {
                return (new Date()).getTime() / 1000;
            },
            render: function () {
                return tt.createTtNode({
                    type: 'div',
                    css: ['stop-watch'],
                    children: [
                        tt.createTtNode({
                            type: 'i',
                            css: function () {
                                switch (this.getStatus()) {
                                    case 'initial':
                                        return ['fas', 'fa-play', 'stop-watch-toggle'];
                                    case 'running':
                                        return ['fas', 'fa-pause', 'stop-watch-toggle'];
                                    case 'paused':
                                        return ['fas', 'fa-play', 'stop-watch-toggle'];
                                    case 'finished':
                                        return ['fas', 'fa-check', 'stop-watch-toggle'];
                                }
                            }.bind(this),
                            click: function () {
                                this.toggle();
                            }.bind(this)
                        }),
                        tt.createTtNode({
                            type: 'i',
                            css: ['fas', 'fa-undo', , 'stop-watch-reset'],
                            click: function () {
                                this.reset();
                            }.bind(this)
                        }),
                        tt.createTtNode({
                            type: 'div',
                            css: ['stop-watch-time'],
                            text: function () {
                                return this.getDisplayTime();
                            }.bind(this)
                        })
                    ]
                });
            },
            pad: function (num, size) {
                var s = "000000000" + num;
                return s.substr(s.length - size);
            },
            update: function () {
                if (this.getStatus() !== 'running') {
                    return;
                }
                var elapsedTime = this.getCurrentTime() - this.startTime;
                var remainingTime = this.duration - elapsedTime + this.pauseTime;
                if (remainingTime <= 0) {
                    remainingTime = 0;
                    window.clearInterval(this.updateInterval);
                    this.updateInterval = null;
                    this.setStatus('finished');
                    if (this.finished) {
                        this.finished();
                    }
                }
                this.updateDisplay(remainingTime);
            },
            updateDisplay(remainingTime) {
                var remainingTimeMinutes = this.pad(Math.floor(remainingTime / 60), 2);
                var remainingTimeSeconds = this.pad(Math.floor(remainingTime - remainingTimeMinutes * 60), 2);
                this.setDisplayTime(remainingTimeMinutes + ':' + remainingTimeSeconds);
            }
        })

    };

    return module;

});
