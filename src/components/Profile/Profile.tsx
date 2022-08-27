import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
export { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { createUser, signIn, signOut } from '../../store/profile/profileSlice';
import { Checkbox } from '@mui/material';

export function Profile() {
  const isAuth = useSelector((state: StoreState) => state.profile.auth.isAuth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const signIn = () => {
    const payload = {
      email,
      password,
    };
    dispatch<any>(signIn());
  };
  const signUp = () => {
    const payload = {
      email,
      password,
    };
    dispatch<any>(createUser());
  };
  const signOut = () => {
    dispatch<any>(signOut());
  };
  return (
    <>
      <h2>Profile</h2>
      Loginned:
      <Checkbox checked={isAuth} defaultChecked />
      <form style={{ width: '400px' }}>
        <Input setField={setEmail}></Input>
        <Input setField={setPassword}></Input>
        {isAuth ? (
          <Button
            addField={signOut}
            disabled={!((email !== '' && password !== '') || isAuth === true)}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            addField={signIn}
            disabled={!((email !== '' && password !== '') || isAuth === false)}
          >
            Sign In
          </Button>
        )}
        <Button
          addField={signUp}
          disabled={!((email !== '' && password !== '') || isAuth === true)}
        >
          Create
        </Button>
      </form>
    </>
  );
}
