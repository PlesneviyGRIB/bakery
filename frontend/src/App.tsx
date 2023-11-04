import React from 'react';
import ReactDOM from 'react-dom/client';
import {ProductListPage} from "./pages/ProductListPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {NotFoundPage} from "./pages/NotFoundPage";
import {ProductPage} from "./pages/ProductPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <NotFoundPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/products",
        element: <ProductListPage />,
    },
    {
        path: "/products/:productId",
        element: <ProductPage />,
    },
]);

root.render(
    <RouterProvider router={router} />
);
