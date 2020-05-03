import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import * as routes from '../config/route.config';
import {connect} from "react-redux";


class privateRoute extends Component {

    render() {
        const {logIn, children, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={({location}) =>
                    logIn ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: routes.LOGIN_ROUTE,
                                state: {from: location}
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mapStateToProps = ({user}) => {
    return {
        logIn: user.logIn
    }
};

export default connect(
    mapStateToProps,
    null
)(privateRoute);
