import React from 'react';
import logo from '../images/logo.svg';
import { Switch, Route, Link } from 'react-router-dom';

const Header = ( {email}) => {

    const signOut = () => {
        localStorage.removeItem('token');
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип cайта Mesto."/>
            <Switch>
            <Route path="/sign-up">
                <Link to="/sign-in" className="header__link button-hover">Войти</Link>
            </Route>
            <Route path="/sign-in">
                <Link to="/sign-up" className="header__link button-hover">Регистрация</Link>
            </Route>
            <Route path="/content">
                <div className="header__link-block">
                <p className="header__email">{email}</p>
                <Link to="/sign-in" onClick={signOut} className="header__link button-hover">Выйти</Link>
                </div>
            </Route>
            </Switch>
        </header>
    );
}

export default Header;
