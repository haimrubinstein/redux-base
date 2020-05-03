import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import actions from '../../../redux/actions'

export default () => {
    let history = useHistory();
    let location = useLocation();
    let dispatch = useDispatch();

    let { from } = location.state || { from: { pathname: "" } };
    let login = () => {
        console.log(actions);
        dispatch(actions.LOG_IN({}));
        history.replace(from);
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}
