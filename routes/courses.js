const {Router} = require('express');
const Course = require('../models/course');
const router = Router();
const auth = require('../middleware/auth');
const {validationResult} = require('express-validator');
const {courseValidators} = require('./utils/validators');

const isOwner = (course, req) => course.userId.toString() === req.user.id;

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('userId');
        res.render('courses', { title : 'Courses page',
                                isCourses : true,
                                courses: courses,
                                userId: req.user ? req.user._id.toString() : null
        });
    } catch (e) {
        console.log(e)
    }
});

router.get('/:id/edit', auth, async (req, res) => {
   if (!req.query.allow) {
       return res.redirect('/');
   };
   try {
       const course = await Course.findById(req.params.id);
       if (!isOwner(course, req)) {
           return   res.redirect('/courses');
       }
       res.render('course-edit', {title: `Edit ${course.title}`, course: course});
   } catch (e) {
       console.log(e)
   }
});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('course', {title: `Course: ${course.title}`, course: course});
    } catch (e) {
        console.log(e)
    }
});

router.post('/edit', auth, courseValidators, async (req, res) => {
    try {
        const {id} = req.body;
        delete req.body.id;
        const course = await Course.findById(id);
        if (!isOwner(course, req)) {
            return   res.redirect('/courses');
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render('course-edit',
                {   title : `Edit ${course.title}`,
                    error:  errors.array()[0].msg,
                    data: {
                        title: req.body.title,
                        price: req.body.price,
                        img: req.body.img,
                    },
                    course
                });
        }
        Object.assign(course, req.body);
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});

router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({_id: req.body.id, userId: req.user.id});
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;