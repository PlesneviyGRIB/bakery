import React from 'react';
import ReactDOM from 'react-dom/client';
import {MainPage} from "./pages/MainPage";
import './widgets/default/app.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <MainPage/>
);
