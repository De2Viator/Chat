import React, { FC, memo } from 'react';
import TextField from '@mui/material/TextField';
import './Input.scss';

type Props = {
  setField: (field: string) => void;
};
export const Input: FC<Props> = memo(function Input(props: Props) {
  return (
    <TextField
      autoFocus
      size="small"
      onChange={(e) => props.setField(e.target.value)}
      data-testid="inputName"
      id="outlined-basic"
      type="text"
      variant="outlined"
      className="input"
    />
  );
});
