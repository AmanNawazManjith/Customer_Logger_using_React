const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' +err));
});



router.route('/add').post((req, res) => {
    const jNum = req.body.jNum;
    const cName = req.body.cName;
    const cNum = req.body.cNum;
    const itemDetail = req.body.itemDetail;
    const problem = req.body.problem;
    const workDone = req.body.workDone;
    const workStat = req.body.workStat;
    const charges = req.body.charges;
    const delDate = Date.parse(req.body.date);

    const newExercise = new Exercise({
        jNum,
        cName,
        cNum,
        itemDetail,
        problem,
        workDone,
        workStat,
        charges,
        delDate,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error :'+ err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err))
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.jNum = req.body.jNum;
            exercise.cName = req.body.cName;
            exercise.cNum = req.body.cNum;
            exercise.itemDetail = req.body.itemDetail;
            exercise.problem = req.body.problem;
            exercise.workDone = req.body.workDone;
            exercise.workStat = req.body.workStat;
            exercise.charges = req.body.charges;
            exercise.delDate = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Execise updated!'))
                .catch(err => res.json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;