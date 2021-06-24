import React from 'react';

import { Route,Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

type Props = {
    path:string;
    element:React.ReactElement;
    children?:React.ReactNode
}

const PrivateRoute = ({path,children,...props}:Props) => {
    
    const isUserloggedIn = useAppSelector(state => state.auth.login)
   
    return isUserloggedIn ? (
        <Route path={path} {...props}>
            {children}
        </Route>
    ) : (
        <Navigate state={{from:path}} to="/" replace/>
    )
}

export default PrivateRoute;