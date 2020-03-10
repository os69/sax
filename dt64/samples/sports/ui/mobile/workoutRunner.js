define(['../../../../src/index', './stopWatch', '../time'], function (tt, stopWatch, time) {

    var module = {};

    module.createWorkoutItemTtNode = tt.createTtNodeCreator({
        init: function (params) {
            this.item = params.item;
            tt.initProperty(this.item, 'count');
            tt.initProperty(this.item, 'duration');
            tt.initProperty(this.item, 'exercise');
            this.checked = false;
            tt.initProperty(this, 'checked');
        },
        createLine1: function () {
            return tt.createTtNode({
                type: 'div',
                css: ['workout-runner-item-line1'],
                children: [
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-item-line1-name'],
                        text: function () {
                            return this.item.getName();
                        }.bind(this)
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-item-line1-exercise-name'],
                        text: function () {
                            return this.item.getExercise().getName();
                        }.bind(this)
                    })
                ]
            })
        },
        createLine2: function () {
            var children = [];
            children.push(tt.createTtNode({
                type: 'div',
                css: ['workout-runner-item-line2-count'],
                text: '' + this.item.getCount() + 'x'
            }));
            if (this.item.getCount() === 1) {
                children.push(tt.createTtNode({
                    type: 'div',
                    css: ['workout-runner-item-line2-stop-watch'],
                    children: [stopWatch.createTtNode({
                        seconds: this.item.getDuration()
                    })]
                }));
            } else {
                children.push(tt.createTtNode({
                    type: 'div',
                    css: ['workout-runner-item-line2-stop-watch'],
                    text: function () {
                        return time.int2ext(this.item.getDuration());
                    }.bind(this)
                }));
            }
            return tt.createTtNode({
                type: 'div',
                css: ['workout-runner-item-line2'],
                children: children
            })
        },
        render: function () {

            return tt.createTtNode({
                type: 'div',
                data: this,
                css: function () {
                    if (this.getChecked()) {
                        return ['workout-runner-item', 'workout-runner-item-checked'];
                    } else {
                        return ['workout-runner-item'];
                    }
                }.bind(this),
                children: [
                    tt.createTtNode({
                        type: 'i',
                        css: function () {
                            var checked = this.getChecked();
                            if (checked) {
                                return ['fas', 'fa-check-square', 'workout-runner-item-checkbox']
                            } else {
                                return ['fas', 'fa-square', 'workout-runner-item-checkbox'];
                            }
                        }.bind(this),
                        click: function () {
                            var checked = this.getChecked();
                            this.setChecked(!checked);
                        }.bind(this)
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-item-line-container'],
                        children: [
                            this.createLine1(),
                            this.createLine2()]
                    })
                ]
            });
        }
    });

    module.createTtNode = tt.createTtNodeCreator({
        init: function (params) {
            this.mobileUi = params.mobileUi;
            this.workout = params.workout;
        },
        render: function () {
            var children = tt.createMappedList(this.workout.items, function (item) {
                return module.createWorkoutItemTtNode({ item: item });
            });
            tt.createReducedListProperty(this, 'elapsedTime', children, function (accu, item) {
                return accu + (item.data.getChecked() ? item.data.item.getTotalDuration() : 0);
            }, 0);
            return tt.createTtNode({
                type: 'div',
                children: [
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-header-container'],
                        children: [
                            tt.createTtNode({
                                type: 'div',
                                css: ['workout-runner-header'],
                                children: [
                                    tt.createTtNode({
                                        type: 'i',
                                        css: ['fas', 'fa-arrow-left'],
                                        click: function () {
                                            this.mobileUi.showWorkout(this.workout.parent);
                                        }.bind(this),
                                    }),
                                    tt.createTtNode({
                                        type: 'div',
                                        css: ['workout-runner-header-text'],
                                        text: this.workout.getName()
                                    })]
                            }),
                            tt.createTtNode({
                                type: 'div',
                                css: ['workout-runner-subheader'],
                                text: function () {
                                    var elapsedTime = this.getElapsedTime();
                                    var totalDuration = this.workout.getTotalDuration();
                                    var remainingTime = totalDuration - elapsedTime;
                                    var percentage = Math.floor(elapsedTime / totalDuration * 100);
                                    return percentage + '% - ' + time.int2ext(remainingTime);
                                }.bind(this)
                            }),
                        ]
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-items'],
                        children: children
                    })
                ]
            })
        }
    });

    return module;

});
