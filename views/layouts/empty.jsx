const React = require('react');
const Head = require('../partials/head');
const Footer = require('../partials/footer');

function EmptyLayout(props) {
    return (
        <html lang="en">
            <Head title={props.title}/>
            <body>
                {props.children}
                <Footer />
            </body>
        </html>
    );
}

module.exports = EmptyLayout;