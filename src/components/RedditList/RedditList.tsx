import { List, ListItem } from '@mui/material';
import React, { FC } from 'react';
import { RedditUser } from '../store/chats/chatSlice';
type Props = { reddit: RedditUser[]; img: string };
export const RedditList: FC<Props> = (props) => {
  return (
    <>
      <List>
        {props.reddit.map((post) => (
          <ListItem key={post.data.id}>
            <img
              src={props.img}
              style={{ width: '50px' }}
              alt={post.data.title}
            />
            {post.data.subreddit}
            <br />
            {post.data.title}
          </ListItem>
        ))}
      </List>
    </>
  );
};
