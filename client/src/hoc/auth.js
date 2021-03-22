import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function authentication(ComponentName, isLoggedIn, isAdmin) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          if (isLoggedIn) {
            props.history.push('/login');
          }
        } else {
          if (isAdmin && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            if (isLoggedIn === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, [dispatch, props.history]);
    return <ComponentName {...props} user={user} />;
  }

  return AuthenticationCheck;
}
