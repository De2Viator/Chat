import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';
import './User.scss';
import { ChatUser } from '../../../shared/user';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

export const User: FC<{ user: ChatUser }> = ({ user }) => {
  const userId = useSelector<StoreState>((state) => state.user.user._id);
  const isOwner = user._id === userId ? true : false;
  return (
    <Link className="user-link" key={user._id} to={`/chats/${user._id}`}>
      <ListItem disablePadding data-testid="message">
        <ListItemButton>
          {!isOwner && (
            <img
              className="user-image"
              src={`data:image${user.photo.type};base64,${user.photo.data}`}
              alt="user image"
            />
          )}
          {isOwner && <FontAwesomeIcon icon={faBriefcase} />}
          <ListItemText>{isOwner ? 'Сохраненное' : user.nick}</ListItemText>
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
