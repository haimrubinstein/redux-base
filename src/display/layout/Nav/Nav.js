import React from 'react';
import './Nav.css';
import * as routes from '../../../config/route.config'
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux'


export default function Nav(props) {
    const user = useSelector(state => state.user);

    return (
        <nav className={'navContainer'}>
            <ul className={'nav-links'}>
                <li className={'nav-links-item-container'}>
                    <Link className={'nav-links-item'} to={routes.HOME_ROUTE}>Home</Link>
                </li>
                <li className={'nav-links-item-container'}>
                    <Link className={'nav-links-item'} to={routes.FEED_ROUTE}>feed</Link>
                </li>
            </ul>

            <ul className={'nav-links'}>
                <li className={'nav-links-item-container'}>
                    {!user.logIn && <Link className={'nav-links-item'} to="/login">Login</Link> }
                    {user.logIn && <Link className={'nav-links-item'} to="/login">Log out</Link> }
                </li>
            </ul>
        </nav>
    )
}
