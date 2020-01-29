const React = require('react');
const MainLayout = require('./layouts/main');

function CourseEdit(props) {
    const {course} = props;
    return (
        <MainLayout {...props}>
            <h1>Edit {course.title}</h1>

            <form action="/courses/edit" method="post" className='course-form'>
                <div className="input-field">
                    <input defaultValue={course.title} id="title" name="title" type="text" className="validate" required/>
                    <label htmlFor="title">Course name</label>
                    <span className="helper-text" data-error="Specify course name"></span>
                </div>

                <div className="input-field">
                    <input defaultValue={course.price} id="price" name="price" type="number" className="validate" required min="1"/>
                    <label htmlFor="price">Course price</label>
                    <span className="helper-text" data-error="Specify price"></span>
                </div>

                <div className="input-field">
                    <input defaultValue={course.img} id="img" name="img" type="text" className="validate" required/>
                    <label htmlFor="img">URL img</label>
                    <span className="helper-text" data-error="Specify img url"></span>
                </div>

                <input type="hidden" name="id" defaultValue={course.id}/>
                <button type='submit' className="btn btn-primary">Save</button>
            </form>
            <form action='/courses/remove' method='post'>
                <input type="hidden" name='id' defaultValue={course.id}/>
                <button type='submit' className="btn red">Remove</button>
            </form>
        </MainLayout>
    );
}

module.exports = CourseEdit;