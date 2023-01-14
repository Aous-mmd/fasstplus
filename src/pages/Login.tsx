import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { CallApi } from '../api/CallApi';
import ApiList from '../api/ApiList';

type Props = {}


const Login = (props: Props) => {
  let navigate = useNavigate();
  let auth = useAuth();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    CallApi.post(ApiList.login, {
      email: 'super@admin.com',
      password: '123456789'
    })
    auth.signin('test', () => {
      navigate(from, { replace: true });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>Login</div>
  )
}

export default Login