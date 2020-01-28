const React = require('react');
const MainLayout = require('./layouts/main');

function Index(props) {
    return (
        <MainLayout {...props}>
            <h1>Welcome</h1>
            <p>The best courses here</p>
        </MainLayout>
    );
}

module.exports = Index;