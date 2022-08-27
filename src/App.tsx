import React, { lazy, Suspense } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProtectedRoute } from './routes/protectedRoutes';

const Chat = lazy(() =>
  import('./components/Chat/Chat').then((module) => ({
    default: module.Chat,
  }))
);

const Profile = lazy(() =>
  import('./components/Profile/Profile').then((module) => ({
    default: module.Profile,
  }))
);

const Home = lazy(() =>
  import('./components/Home/Home').then((module) => ({
    default: module.Home,
  }))
);

const SignUp = lazy(() =>
  import('./components/SignUp/SignUp').then((module) => ({
    default: module.SignUp,
  }))
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="profile" element={<Profile />} />
              <Route element={<ProtectedRoute />}>
                <Route path="home" element={<Home />} />
                <Route path="chats" element={<Chat />}>
                  <Route path=":id" />
                </Route>
              </Route>
              <Route path="signUp" element={<SignUp />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
