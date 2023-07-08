import React, { memo } from 'react';
import ButtonUI from '@mui/material/Button';
type Props = {
  addField: () => void;
  disabled: boolean;
  children: string;
};

export const Button = memo(function Button(props: Props) {
  return (
    <ButtonUI
      disabled={props.disabled}
      variant="contained"
      onClick={props.addField}
    >
      {props.children}
    </ButtonUI>
  );
});
