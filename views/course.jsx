const React = require('react');
const EmptyLayout = require('./layouts/empty');

function Course(props) {
    const {course} = props;
    return (
        <EmptyLayout {...props}>
            <div className="course">
                <h1>{course.title}</h1>
                <img src={course.img} alt={course.title}/>
                <p className="price big">{course.price}</p>
            </div>
        </EmptyLayout>
    );
}

module.exports = Course;