const React = require('react');
const MainLayout = require('./layouts/main');

function CourseEdit(props) {
    const {course, csrf, error, data} = props;
    return (
        <MainLayout {...props}>
            <h3>Edit {course.title}</h3>

            {error ? <p className='alert'>{error}</p> : <></>}

            <form action="/courses/edit" method="post" className='course-form' noValidate={true}>
                <div className="input-field">
                    <input defaultValue={data ? data.title : course.title} id="title" name="title" type="text" className="validate" required/>
                    <label htmlFor="title">Course name</label>
                    <span className="helper-text" data-error="Specify course name"></span>
                </div>

                <div className="input-field">
                    <input defaultValue={data ? data.price : course.price} id="price" name="price" type="number" className="validate" required min="1"/>
                    <label htmlFor="price">Course price</label>
                    <span className="helper-text" data-error="Specify price"></span>
                </div>

                <div className="input-field">
                    <input defaultValue={data ? data.img : course.img} id="img" name="img" type="text" className="validate" required/>
                    <label htmlFor="img">URL img</label>
                    <span className="helper-text" data-error="Specify img url"></span>
                </div>

                <input type="hidden" name="id" defaultValue={course.id}/>
                <input type='hidden' name='_csrf' defaultValue={csrf}/>
                <button type='submit' className="btn btn-primary">Save</button>
            </form>
            <form action='/courses/remove' method='post'>
                <input type="hidden" name='id' defaultValue={course.id}/>
                <input type='hidden' name='_csrf' defaultValue={csrf}/>
                <button type='submit' className="btn red">Remove</button>
            </form>
        </MainLayout>
    );
}

module.exports = CourseEdit;