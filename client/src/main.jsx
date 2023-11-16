import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NotFound from './pages/NotFound.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
