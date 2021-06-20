define(['../../../src/index', './Root', './ExerciseBasic', './ExerciseCollection', './WorkoutBasic', './WorkoutCollection', './WorkoutItem', './WorkoutItemCollection', './MovementBasic', './MovementCollection', './MuscleBasic', './MuscleCollection'], function (tt, Root, ExerciseBasic, ExerciseCollection, WorkoutBasic, WorkoutCollection, WorkoutItem, WorkoutItemCollection, MovementBasic, MovementCollection, MuscleBasic, MuscleCollection) {

    var classes = {
        Root: { cls: Root },
        ExerciseBasic: { cls: ExerciseBasic },
        ExerciseCollection: { cls: ExerciseCollection },
        WorkoutBasic: { cls: WorkoutBasic },
        WorkoutCollection: { cls: WorkoutCollection },
        WorkoutItem: { cls: WorkoutItem },
        WorkoutItemCollection: { cls: WorkoutItemCollection },
        MovementBasic: { cls: MovementBasic },
        MovementCollection: { cls: MovementCollection },
        MuscleBasic: { cls: MuscleBasic },
        MuscleCollection: { cls: MuscleCollection }
    };

    return tt.core.defineClass({

        init: function () {
            this.odb = new Odb();
            for (var clsName in classes) {
                var clsProps = classes[clsName];
                clsProps.cls.prototype.meta = { name: clsName };
                this.odb.registerClass(clsProps.cls);
            }
        },

        load(name) {
            return tt.ajax.getJson(name).then(json => this.odb.fromJson(json));
        },

        save(name, root) {
            return tt.ajax.postJson(name, this.odb.toJson(root));
        }

    });

});
