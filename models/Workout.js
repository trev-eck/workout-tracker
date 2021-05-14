const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//workout model that contains an array of exercise objects
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
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;