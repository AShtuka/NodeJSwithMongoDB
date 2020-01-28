const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res, next) => {
    const courses = await Course.find();
    res.render('courses', {title : 'Courses page', isCourses : true, courses: courses});
});

router.get('/:id/edit', async (req, res) => {
   if (!req.query.allow) {
       return res.redirect('/');
   };
   const course = await Course.findById(req.params.id);
   res.render('course-edit', {title: `Edit ${course.title}`, course: course})
});

router.get('/:id', async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    res.render('course', {title: `Course: ${course.title}`, course: course});
});

router.post('/edit', async (req, res) => {
    const {id} = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});


module.exports = router;