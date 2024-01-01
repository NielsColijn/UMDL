import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/auth/Login.jsx";
import NotFound from "./views/other/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/other/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },


])

export default router;
