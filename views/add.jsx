const React = require('react');
const MainLayout = require('./layouts/main');

function Add(props) {
    const {csrf, error, data} = props;
    return (
        <MainLayout {...props}>
            <h1>Add course</h1>

            {error ? <p className='alert'>{error}</p> : <></>}

            <form action="/add" method="post">
                <div className="input-field">
                    <input id="title"
                           name="title"
                           type="text"
                           className="validate"
                           required
                           defaultValue={data ? data.title : ''}
                    />
                        <label htmlFor="title">Course name</label>
                        <span className="helper-text" data-error="Specify course name"></span>
                </div>

                <div className="input-field">
                    <input id="price"
                           name="price"
                           type="number"
                           className="validate"
                           required
                           min="1"
                           defaultValue={data ? data.price : undefined}
                    />
                        <label htmlFor="price">Course price</label>
                        <span className="helper-text" data-error="Specify price"></span>
                </div>

                <div className="input-field">
                    <input id="img"
                           name="img"
                           type="text"
                           className="validate"
                           required
                           defaultValue={data ? data.img : ''}
                    />
                        <label htmlFor="img">URL img</label>
                        <span className="helper-text" data-error="Specify img url"></span>
                </div>

                <button className="btn btn-primary">Add course</button>

                <input type='hidden' name='_csrf' defaultValue={csrf}/>
            </form>
        </MainLayout>
    );
}

module.exports = Add;