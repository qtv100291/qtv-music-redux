import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../services/loginService';


const ProtectedRoute = ({path, component: Component, ...rest }) => {
    return ( 
        <Route 
            path = {path}
            render = {props =>{
                if (!authService.getCurrentUser())
                    return (
                        <Redirect 
                            to = {{
                                pathname:"/dang-nhap",
                                state: {from : props.location}
                                }
                            }
                        />
                    )
                return <Component {...props} {...rest}/>
                }
            }
        />
    );
}
export default ProtectedRoute;