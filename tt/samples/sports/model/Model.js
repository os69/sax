define(['../../../src/index', './Db', './Root', './ExerciseCollection', './WorkoutCollection', './MovementCollection', './MuscleCollection'],
    function (tt, Db, Root, ExerciseCollection, WorkoutCollection, MovementCollection, MuscleCollection) {

        var dbPath = '../../db.json';
        if(window.globalEnv && window.globalEnv.dbPath){
            dbPath = window.globalEnv.dbPath;
        };

        return tt.core.defineClass({
        
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

                // root muscle
                var muscleCollection = new MuscleCollection({ name: 'All Muscles' });

                // root
                return new Root({ exercise: exerciseCollection, workout: workoutCollection, movement: movementCollection, muscle: muscleCollection });

            },

            load: function () {            
                return this.db.load(dbPath).then(function (root) {
                    this.setRoot(root);
                }.bind(this));
            },

            save: function () {
                return this.db.save(dbPath, this.getRoot()).then(function () {
                    //alert('saved');
                })
            }

        });

    });
