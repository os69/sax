define(['../../src/index', './model/Db', './model/Root', './model/ExerciseCollection', './model/WorkoutCollection', './model/MovementCollection', './ui/desktop/desktopUI', './ui/mobile/mobileUI'],
    function (tt, Db, Root, ExerciseCollection, WorkoutCollection, MovementCollection, desktopUI, mobileUI) {

        var model = tt.core.defineClass({

            init: function () {
                this.db = new Db();
                tt.initProperty(this, 'root');
                this.setRoot(this.createRoot());
            },

            createRoot: function () {

                // root exercise collection
                var exerciseCollection = new ExerciseCollection({ name: 'All Exercises' });
                var exercise1 = exerciseCollection.createExerciseBasic({ name: 'Liegestützen' });
                var exercise2 = exerciseCollection.createExerciseBasic({ name: 'Bankdrücken' });

                // root workout collection
                var workoutCollection = new WorkoutCollection({ name: 'All Workouts' });
                var workout = workoutCollection.createWorkoutBasic({ name: 'Basic' });
                workout.createItem({ name: 'Übung 1', exercise: exercise1, count: 10 });
                workout.createItem({ name: 'Übung 2', exercise: exercise2, count: 5 });
                workout = workoutCollection.createWorkoutBasic({ name: 'Hard' });
                workout.createItem({ name: 'Übung 1', exercise: exercise1, count: 20 });
                workout.createItem({ name: 'Übung 2', exercise: exercise2, count: 10 });

                // root movement
                var movementCollection = new MovementCollection({ name: 'All Movement' });

                // root
                return new Root({ exercise: exerciseCollection, workout: workoutCollection, movement: movementCollection });

            },

            load: function () {
                this.db.load('db.json').then(function (root) {
                    this.setRoot(root);
                }.bind(this));
            },

            save: function () {
                this.db.save('db.json', this.getRoot()).then(function () {
                    //alert('saved');
                })
            }

        });

        var model = new model();
        document.getElementById('rootContainer').appendChild(tt.createTtNode({
            type: 'div',
            children: [desktopUI.createTtNode(model), mobileUI.createTtNode(model)]
        }).getDomNode());


    });
