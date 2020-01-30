const React = require('react');

function Navbar(props) {
    const {isHome, isCourses, isAdd, isCart, isOrder, isLogin} = props;

    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">Course App</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">

                    <li className={isHome ? "active" : ""}><a href="/">Main</a></li>

                    <li className={isCourses ? "active" : ""}><a href="/courses">Courses</a></li>

                    <li className={isAdd ? "active" : ""}><a href="/add">Add course</a></li>

                    <li className={isCart ? "active" : ""}><a href="/cart">Cart</a></li>

                    <li className={isOrder ? "active" : ""}><a href="/orders">Orders</a></li>

                    <li className={isLogin ? "active" : ""}><a href="/auth/login#login">Log In</a></li>

                </ul>
            </div>
        </nav>
    )
}

module.exports = Navbar;