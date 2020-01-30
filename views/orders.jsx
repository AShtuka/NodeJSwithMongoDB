const React = require('react');
const MainLayout = require('./layouts/main');

function Orders(props) {
    return (
        <MainLayout {...props}>
            <h1>Your orders</h1>
        </MainLayout>
    );
}

module.exports = Orders;