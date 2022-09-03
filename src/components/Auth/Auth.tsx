import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import './Auth.scss';
import { Errors, ErrorsMessages } from '../../shared/errors';
import { signIn as signInStore } from '../../store/profile/profileSlice';
import { Button } from '../Button/Button';

export const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [errors, setErrors] = useState<Errors>({} as Errors);
  const dispatch = useDispatch();
  const signIn = () => {
    setErrors({} as Errors);
    const emailReg = /\w{8,15}@gmail.com/;
    const passwordReg = /.{10}/;
    const errorForm = {} as Errors;

    if (!emailReg.test(email)) {
      errorForm.email = ErrorsMessages.EMAIL;
    }

    if (!passwordReg.test(password)) {
      errorForm.password = ErrorsMessages.PASSWORD;
    }

    if (Object.values(errorForm).length) {
      setErrors(errorForm);
      return;
    }
    const payload = {
      email,
      password,
    };
    dispatch<any>(signInStore(payload));
  };
  return (
    <>
      <div className="auth">
        <h2 className="auth__chat-title">Chats</h2>
        <div className="auth__form-wrp">
          <form className="auth__form" onSubmit={signIn}>
            <h3>Let&apos;s Chat!</h3>
            <label>
              <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                />
                {errors.email && <Alert severity="error">{errors.email}</Alert>}
              </FormControl>
            </label>
            <label>
              <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && (
                  <Alert severity="error">{errors.password}</Alert>
                )}
              </FormControl>
            </label>
            <div className="auth__navigation">
              <Link to="/signUp">Sign Up</Link>
              <Button
                addField={signIn}
                disabled={!(email !== '' && password !== '')}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
