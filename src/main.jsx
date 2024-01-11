import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root';
import ErrorPage from './ErrorPage';
import Contact from './routes/Contact/Contact';
import EditContact from './routes/EditContact';
import Index from './routes';

import { rootAction, contactLoader, deleteAction, contactAction } from './loaders';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteAction,
        errorElement: <div>Oops! There was an error.</div>
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
