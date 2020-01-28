const React = require('react');
const MainLayout = require('./layouts/main');

function Courses(props) {
    const {courses} = props;
    return (
        <MainLayout {...props}>
            <h1>Courses</h1>
            {courses ?
                courses.map((course, index) => {
                        return (<div key={index}>
                                   <div className="row">
                                        <div className="col s6 offset-s3">
                                            <div className="card">
                                                <div className="card-image">
                                                    <img src={course.img} alt={course.title}/>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title">{course.title}</span>
                                                    <p className="price">{course.price}</p>
                                                </div>
                                                <div className="card-action actions">
                                                    <a href={`/courses/${course._id}`} target="_blank">See course details</a>
                                                    <a href={`/courses/${course._id}/edit?allow=true`} target="_blank">Edit</a>
                                                    <form action="/cart/add" method="post">
                                                        <input type="hidden" name="id" value={course._id}/>
                                                        <button type="submit" className="btn btn-primary">Buy</button>
                                                    </form>
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