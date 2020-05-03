import React from 'react';
import NavBarStyle from './Nav.css';
import * as routes from '../../../config/route.config'
import {Link} from "react-router-dom";

export default function Nav(props) {

    return (
        <div className={'navContainer'}>
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
                    <Link className={'nav-links-item'} to="/login">Login</Link>
                </li>
            </ul>
        </div>
    )
}
