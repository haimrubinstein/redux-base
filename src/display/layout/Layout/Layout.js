import React, {Component} from "react";
import Nav from "../Nav/Nav";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Feed from "../../screens/Feed/Feed";
import Home from "../../screens/Home/Home";
import PrivateRoute from "../../../services/PrivateRoute";
import Login from "../../screens/Login/Login";
import * as routes from '../../../config/route.config'
import LayoutStyle from './Layout.css';

class Layout extends Component {


    render() {
        return (
            <React.Fragment>
                <Router>
                    <Nav/>
                    <div className={'site-content'}>
                        <Switch>
                            <PrivateRoute path={routes.FEED_ROUTE}>
                                <Feed/>
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
