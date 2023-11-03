import React from 'react';
import ReactDOM from 'react-dom/client';
import {ProductListPage} from "./pages/ProductListPage";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <ProductListPage/>
);
