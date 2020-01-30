const React = require('react');
const MainLayout = require('./layouts/main');

function Cart(props) {
    const {courses, price} = props;
    return (
        <MainLayout {...props}>
            <h1>Cart</h1>
            <div id="cart">
                {courses.length > 0 ?
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Count</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) =>
                                    {
                                    return (
                                            <tr key={index}>
                                                <td>{course.title}</td>
                                                <td>{course.count}</td>
                                                <td>
                                                    <button className="btn btn-small js-remove" data-id={course.id}>Delete</button>
                                                </td>
                                            </tr>
                                            )
                                    })
                                }
                            </tbody>
                        </table>
                        <p>
                            <strong>Price: </strong><span className="price">{price}</span>
                        </p>

                        <form action="/orders" method="post">
                            <button type='submit' className='btn'>Make order</button>
                        </form>
                    </>
                    : 'Your cart is empty'}
            </div>
        </MainLayout>
    );
}

module.exports = Cart;