const React = require('react');
const MainLayout = require('./layouts/main');

function Courses(props) {
    const {courses, isAuth, csrf, userId} = props;
    return (
        <MainLayout {...props}>
            <h1>Courses</h1>
            {courses ?
                courses.map((course, index) => {
                        return (<div key={index}>
                                   <div className="row">
                                        <div className="col s12 m8 offset-m2">
                                            <div className="card">
                                                <div className="card-image">
                                                    <img src={course.img} alt={course.title}/>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title">{course.title}</span>
                                                    <p className="price">{course.price}</p>
                                                </div>
                                                <div className="card-action actions">
                                                    <a href={`/courses/${course.id}`} target="_blank">Details</a>
                                                    {isAuth ?
                                                        <>
                                                            {course.userId.id === userId ? <a href={`/courses/${course.id}/edit?allow=true`} target="_blank">Edit</a> : '' }
                                                            <form action="/cart/add" method="post">
                                                                <input type="hidden" name="id" value={course.id}/>
                                                                <button type="submit" className="btn btn-primary">Buy</button>
                                                                <input type='hidden' name='_csrf' defaultValue={csrf}/>
                                                            </form>
                                                        </>
                                                        : ''
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                   </div>
                               </div>
                            )
            }) :
                <p>You don't have any courses yet</p>
            }
        </MainLayout>
    );
}

module.exports = Courses;