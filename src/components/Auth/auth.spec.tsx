import { render } from '@testing-library/react';
import { Profile } from './Profile';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('test profile component', () => {
  it('render profile', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  });
});
