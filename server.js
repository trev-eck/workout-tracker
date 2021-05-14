const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models/index");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// db.Workout.create({ name: "Butt Kicker 9000"})
//     .then(dbWorkout => {
//         console.log(dbWorkout);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });


    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname+'/public/exercise.html'));
    })
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname+'/public/stats.html'));
    })

//ROUTES TO BUILD 

//api

//    /api/workouts      GET
app.get("/api/workouts/", (req, res) => {
    // db.Workout.find({})
    // .then(allWorkouts => {
    //     res.json(allWorkouts);
    // })
    // .catch(err => {
    //     res.json(err);
    // })

    db.Workout.aggregate([{$addFields: { totalDuration: { $sum: "$exercises.duration" } } } ] )
           .then(allWorkouts => {
                res.json(allWorkouts);
            })
            .catch(err => {
                res.json(err);
            })
})
//     /api/workouts/:id    PUT
app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    db.Workout.findOneAndUpdate({_id: req.params.id}, {$push: { exercises: req.body }  }, {new:true}  )
    .then(theWorkout => {
        res.json(theWorkout);
    })
    .catch(err => {
        res.json(err);
    });

});

//      /api/workouts      POST
app.post("/api/workouts", ({body}, res) => {
    db.Workout.create(body)
    .then(newWorkout => {
        res.json(newWorkout);
    })
    .catch(err => {
        res.json(err);
    })


});


//       /api/workouts/range    GET
app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{$addFields: { totalDuration: { $sum: "$exercises.duration" } } } ] ).sort({_id: -1}).limit(7)
    .then(allWorkouts => {
        res.json(allWorkouts);
    })
    .catch(err => {
        res.json(err);
    })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  