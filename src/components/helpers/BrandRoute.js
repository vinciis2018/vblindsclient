import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router';

export default function BrandRoute({component: Component, ...rest}) {
  
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
  return (
    <Route 
      {...rest} 
      render={(props) => 
        userInfo && userInfo.isItanimulli && userInfo.isBrand ? ( 
          <Component {...props}></Component>
        ):(
          <Redirect to="/signin" />
        )}
    ></ Route>
  );
}
