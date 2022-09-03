import { TextField } from '@material-ui/core';
import React, { ChangeEvent, FC, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Stack from '@mui/material/Stack';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { LocalizationProvider } from '@mui/x-date-pickers';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import './SignUp.scss';
import { Errors, ErrorsMessages } from '../../shared/errors';
import { SignUpUser } from '../../shared/user';
import {
  setAuthError,
  signUp as signUpStore,
} from '../../store/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const SignUp: FC = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [userBirthday, setUserBirthday] = useState<Date | null>(null);
  const [nick, setNick] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hobbies] = useState<string[]>(['videogames', 'art']);
  const [userHobby, setUserHobby] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<File>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [errors, setErrors] = useState<Errors>({} as Errors);
  const authError = useSelector<StoreState>((state) => state.auth.error);
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleUserHobby = (event: SelectChangeEvent<typeof userHobby>) => {
    const {
      target: { value },
    } = event;
    setUserHobby(typeof value === 'string' ? value.split(',') : value);
  };

  const handlerUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files as FileList;
    setPhotoFile(file);
    setPhoto(URL.createObjectURL(file));
  };
  function sendForm() {
    setErrors({} as Errors);
    const emailReg = /\w{8,15}@gmail.com/;
    const passwordReg = /.{10}/;
    const nameReg = /\D\S+/;
    const errorForm = {} as Errors;
    if (!emailReg.test(email)) {
      errorForm.email = ErrorsMessages.EMAIL;
    }

    if (!passwordReg.test(password)) {
      errorForm.password = ErrorsMessages.PASSWORD;
    }

    if (!nameReg.test(name)) {
      errorForm.name = ErrorsMessages.NAME;
    }

    if (!nameReg.test(surname)) {
      errorForm.surname = ErrorsMessages.SURNAME;
    }

    if (!photo) {
      errorForm.photo = ErrorsMessages.PHOTO;
    }

    if (!userHobby.length) {
      errorForm.hobby = ErrorsMessages.HOBBY;
    }

    if (!userBirthday) {
      errorForm.birthdayDate = ErrorsMessages.BIRTHDAY_DATE;
    }

    if (!description) {
      errorForm.description = ErrorsMessages.DESCRIPTION;
    }

    if (!nick) {
      errorForm.nick = ErrorsMessages.NICK;
    }

    if (Object.values(errorForm).length) {
      setErrors(errorForm);
      return;
    }

    const user: SignUpUser = {
      name,
      surname,
      nick,
      hobbies: userHobby,
      birthdayDate: userBirthday as unknown as string,
      photo: photoFile as File,
      description,
      email,
      password,
    };
    dispatch<any>(signUpStore(user));
  }
  useEffect(() => {
    return () => {
      dispatch<any>(setAuthError(''));
    };
  }, []);
  return (
    <>
      <div className="form-wrp">
        <form
          className="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            sendForm();
          }}
        >
          <fieldset>
            <label>
              <TextField
                placeholder="Name"
                autoFocus
                size="small"
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="outlined-basic"
                type="text"
                variant="outlined"
                className="input w-100"
              />
            </label>
            {errors.name && <Alert severity="error">{errors.name}</Alert>}
          </fieldset>
          <fieldset>
            <label>
              <TextField
                placeholder="Surname"
                autoFocus
                size="small"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                id="outlined-basic"
                type="text"
                variant="outlined"
                className="input w-100"
              />
            </label>
            {errors.surname && <Alert severity="error">{errors.surname}</Alert>}
          </fieldset>
          <fieldset>
            <label>
              <TextField
                placeholder="Nickname"
                autoFocus
                size="small"
                onChange={(e) => setNick(e.target.value)}
                value={nick}
                id="outlined-basic"
                type="text"
                variant="outlined"
                className="input w-100"
              />
            </label>
            {errors.nick && <Alert severity="error">{errors.nick}</Alert>}
          </fieldset>
          <fieldset>
            <label>
              <TextField
                placeholder="Email"
                autoFocus
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="outlined-basic"
                type="text"
                variant="outlined"
                className="input w-100"
              />
            </label>
            {errors.email && <Alert severity="error">{errors.email}</Alert>}
          </fieldset>
          <fieldset>
            <label>
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
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
              </FormControl>
            </label>
            {errors.password && (
              <Alert severity="error">{errors.password}</Alert>
            )}
          </fieldset>
          <fieldset>
            <Stack spacing={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Birthday date"
                  value={userBirthday}
                  onChange={(birthday: Date | null) => {
                    setUserBirthday(birthday);
                  }}
                  renderInput={(params) => (
                    <TextField variant="outlined" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Stack>
            {errors.birthdayDate && (
              <Alert severity="error">{errors.birthdayDate}</Alert>
            )}
          </fieldset>
          <fieldset>
            <label>
              <TextField
                autoFocus
                size="medium"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                id="outlined-basic"
                type="text"
                multiline
                minRows={2}
                placeholder="Tell about yourself"
                variant="outlined"
                className="input w-100"
              />
            </label>
            {errors.description && (
              <Alert severity="error">{errors.description}</Alert>
            )}
          </fieldset>
          <fieldset>
            <div>
              <FormControl sx={{ m: 1, width: 4 / 4 }}>
                <InputLabel id="chip-label">Hobbies</InputLabel>
                <Select
                  labelId="chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={userHobby}
                  onChange={handleUserHobby}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {hobbies.map((hobby) => (
                    <MenuItem
                      key={hobby}
                      value={hobby}
                      style={getStyles(hobby, userHobby, theme)}
                    >
                      {hobby}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {errors.hobby && <Alert severity="error">{errors.hobby}</Alert>}
          </fieldset>
          <fieldset>
            <label htmlFor="photo" className="photo-picker">
              <FontAwesomeIcon className="photo-font" icon={faImage} />
            </label>
            <input
              id="photo"
              type="file"
              name="photo"
              onChange={(e) => handlerUploadPhoto(e)}
            />
            <div className="photo-wrp">
              {photo && (
                <img src={photo} alt="user photo" className="user-photo" />
              )}
            </div>
            {errors.photo && <Alert severity="error">{errors.photo}</Alert>}
          </fieldset>
          <Button type="submit" variant="contained">
            Send Form
          </Button>
          {authError && <Alert severity="error">{authError as string}</Alert>}
        </form>
      </div>
    </>
  );
};
