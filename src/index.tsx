import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { inspect } from '@xstate/inspect';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Homepage, Login, Register, AdminPanel} from './views'

if (process.env.NODE_ENV === 'development') {
  inspect({
    iframe: () => document.querySelector('iframe[data-xstate]') as HTMLIFrameElement,
    url: 'https://stately.ai/viz?inspect'
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path='auth'>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            <Route path='admin-panel' element={<AdminPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
