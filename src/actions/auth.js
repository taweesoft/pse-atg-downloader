import { AUTH_SUCCESS, AUTH_ERROR, SIGNIN_SUCCESS, SIGNIN_ERROR } from 'src/constants';
import { AuthController } from 'src/controllers';
import { authenticate as auth } from 'src/services/auth';
import history from 'src/containers/history';

export const authenticate = () => {
    return dispatch => {
        let token = AuthController.getToken();
        if (token) {
            auth(token)
                .then(res => {
                    if (res.success) {
                        dispatch({
                            type: AUTH_SUCCESS,
                            data: res.user
                        });
                    } else {
                        dispatch({
                            type: AUTH_ERROR,
                            data: res.message
                        });
                    }
                })
                .catch(err => { throw new Error(err); });
        } else {
            dispatch({
                type: AUTH_ERROR,
                data: 'No token'
            });
        }
    };
};

export const signin = (username, password) => {
    return dispatch => {
        AuthController.signin(username, password)
            .then(res => {
                dispatch({
                    type: SIGNIN_SUCCESS,
                    data: res
                });
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SIGNIN_ERROR,
                    data: err.message
                });
            });
    };
};