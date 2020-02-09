const React = require('react');
const MainLayout = require('./layouts/main');

function Orders(props) {
    const {orders} = props;
    return (
        <MainLayout {...props}>
            <h2>My orders</h2>
            {orders.length > 0 ?
                orders.map((order, index) => {
                    return  (
                            <div className='row' key={index}>
                                <div className='col s12 m8 offset-m2'>
                                    <div className='card'>
                                        <div className='card-content'>
                                            <span className='card-title font'>OrderNo: {order._id.toString()}</span>
                                            <p className='date'>Date: {order.date.toString()}</p>
                                            <p><em>{order.user.name}</em> ({order.user.userId.email})</p>
                                            <ol>
                                                {order.courses.map((item, index) => {
                                                    return(
                                                            <li key={index*10}>
                                                                {item.course.title} (x<strong>{item.count}</strong>)
                                                            </li>
                                                            )
                                                })}
                                            </ol>
                                            <hr/>
                                            <p>Price: <span className='price'>{order.price}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                                })

                : 'You have not placed any orders yet'}
        </MainLayout>
    );
}

module.exports = Orders;