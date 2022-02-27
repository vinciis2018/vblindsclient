import React, {Fragment, ReactNode} from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router';

interface Props {
  children: ReactNode;
}
function EmptyLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default function PrivateRoute({component: Component, layout: Layout = EmptyLayout, ...rest}: any) {
  
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  
  return (
    <Route 
      {...rest} 
      render={(props) => 
        userInfo ? ( 
          <Layout {...props}>
            <Component {...props}></Component>
          </Layout>
        ):(
          <Redirect to="/signin" />
        )}
    ></ Route>
  );
}
