const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    
    name: {
        type: String,
    },
    exercises: [{
        type: {
            type: String,
        },
        name: {
            type: String,
        },
        distance: {
            type: Number,
        },
        duration: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        }
       
    }],
    day: {
        type: Date,
        default: Date.now
    },
    totalDuration: {
        type: Number,
        default: 0
    }
    // exercise: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Exercise"
    // }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;