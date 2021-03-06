import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'src/containers/PrivateRoute';
import Admin from 'src/containers/admin/Admin';
import { authenticate } from 'src/services/auth';
import { AuthController } from 'src/controllers';
import SignIn from 'src/containers/admin/signin/SignIn';

class Routes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authed: false
        };
    }

    componentDidMount() {
        authenticate(AuthController.getToken())
            .then(res => {
                this.setState({
                    authed: res.user.is_admin,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    authed: false,
                    loading: false
                });
            });
    }

    render() {
        return (
            <Switch>
                <Route exact path='/admin/signin' component={SignIn} />
                <PrivateRoute exact path='/admin' redirect={'/admin/signin'} component={Admin} authed={this.state.authed} />
            </Switch>
        );
    }
}

export default Routes;