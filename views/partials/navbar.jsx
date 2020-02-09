const React = require('react');

function Navbar(props) {
    const {isHome, isCourses, isAdd, isCart, isOrder, isLogin, isAuth, isProfile} = props;
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo left">Course App</a>
                <a href="#" data-target="nav-mobile" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">

                    <li className={isHome ? "active" : ""}><a href="/">Main</a></li>

                    <li className={isCourses ? "active" : ""}><a href="/courses">Courses</a></li>

                    {isAuth ?
                        <>
                            <li className={isAdd ? "active" : ""}><a href="/add">Add course</a></li>

                            <li className={isCart ? "active" : ""}><a href="/cart">Cart</a></li>

                            <li className={isOrder ? "active" : ""}><a href="/orders">Orders</a></li>

                            <li className={isProfile ? "active" : ""}><a href="/profile">Profile</a></li>

                            <li ><a href="/auth/logout">Log Out</a></li>
                        </>
                        :
                        ''
                    }

                    {!isAuth ?  <li className={isLogin ? "active" : ""}><a href="/auth/login#login">Log In</a></li> : ''}

                </ul>

                <ul id="nav-mobile" className="sidenav">

                    <li className={isHome ? "active" : ""}><a href="/">Main</a></li>

                    <li className={isCourses ? "active" : ""}><a href="/courses">Courses</a></li>

                    {isAuth ?
                        <>
                            <li className={isAdd ? "active" : ""}><a href="/add">Add course</a></li>

                            <li className={isCart ? "active" : ""}><a href="/cart">Cart</a></li>

                            <li className={isOrder ? "active" : ""}><a href="/orders">Orders</a></li>

                            <li className={isProfile ? "active" : ""}><a href="/profile">Profile</a></li>

                            <li ><a href="/auth/logout">Log Out</a></li>
                        </>
                        :
                        ''
                    }

                    {!isAuth ?  <li className={isLogin ? "active" : ""}><a href="/auth/login#login">Log In</a></li> : ''}

                </ul>
            </div>
        </nav>
    )
}

module.exports = Navbar;