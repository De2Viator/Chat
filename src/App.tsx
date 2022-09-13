import React, { lazy, Suspense } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProtectedRoute } from './routes/protectedRoutes';
import { Auth } from './components/Auth/Auth';
const Chat = lazy(() =>
  import('./components/Chat/Chat').then((module) => ({
    default: module.Chat,
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

const MessageList = lazy(() =>
  import('./components/MessageList/MessageList').then((module) => ({
    default: module.MessageList,
  }))
);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="auth" element={<Auth />} />
              <Route path="signUp" element={<SignUp />} />
              <Route element={<ProtectedRoute />}>
                <Route path="home" element={<Home />} />
                <Route path="chats" element={<Chat />}>
                  <Route path=":id" element={<MessageList />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
