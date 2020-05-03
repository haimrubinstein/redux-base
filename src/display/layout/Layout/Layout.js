import React, {Component} from "react";
import Nav from "../Nav/Nav";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Feeds from "../../screens/Feeds/Feeds";
import Home from "../../screens/Home/Home";
import PrivateRoute from "../../../services/PrivateRoute";
import Login from "../../screens/Login/Login";
import * as routes from '../../../config/route.config'
import './Layout.css';

class Layout extends Component {


    render() {
        return (
            <React.Fragment>
                <Router>
                    <Nav/>
                    <div className={'site-content'}>
                        <Switch>
                            <PrivateRoute path={routes.FEED_ROUTE}>
                                <Feeds/>
                            </PrivateRoute>
                            <Route path={routes.LOGIN_ROUTE}>
                                <Login/>
                            </Route>
                            <Route path={routes.HOME_ROUTE} exact>
                                <Home/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </React.Fragment>
        )
    }
}


export default Layout;
