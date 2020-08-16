import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../services/loginService';


const ProtectedRoute = ({path, component: Component, ...rest }) => {
    const user = authService.getCurrentUser();
    const timeNow = Date.now()/1000;
    return ( 
        <Route 
            path = {path}
            render = {props =>{
                if (!(user && user.exp > timeNow))
                    return (
                        <Redirect 
                            to = {{
                                pathname:"/dang-nhap",
                                state: {from : props.location}
                                }
                            }
                        />
                    )
                else return <Component {...props} {...rest}/>
                }
            }
        />
    );
}
export default ProtectedRoute;