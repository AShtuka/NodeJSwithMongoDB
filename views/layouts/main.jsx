const React = require('react');
const Head = require('../partials/head');
const Navbar = require('../partials/navbar.jsx');
const Footer = require('../partials/footer');

function MainLayout(props) {
    return (
            <html lang="en">
                <Head title={props.title}/>
                <body>
                    <Navbar {...props}/>
                    <div className="container">
                        {props.children}
                    </div>
                    <Footer />
                </body>
            </html>
    );
}

module.exports = MainLayout;