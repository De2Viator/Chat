import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
export { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { authUser } from '../../store/profile/profileSlice';
import { Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';

export function Profile() {
  const isAuth = useSelector((state: StoreState) => state.profile.auth.isAuth);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const sendAuth = () => {
    const payload = {
      login,
      password,
    };
    dispatch(authUser(payload));
  };
  return (
    <>
      <h2>Profile</h2>
      Loginned:
      <Checkbox checked={isAuth} defaultChecked />
      <form style={{ width: '400px' }}>
        <Input setField={setLogin}></Input>
        <Input setField={setPassword}></Input>
        <Button
          addField={sendAuth}
          disabled={!((login !== '' && password !== '') || isAuth === true)}
        >
          {isAuth ? 'Log out' : 'Log in'}
        </Button>
      </form>
      <Link to="/signUp">sign up</Link>
    </>
  );
}
