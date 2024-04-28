import { createBrowserRouter } from "react-router-dom";
import AuthorizationPageUser from "../pages/AuthorizationPageUser";
import AuthorizationPageMentor from "../pages/AuthorizationPageMentor";
import RegistrationPageUser from "../pages/RegistrationPageUser";
import RegistrationPageMentor from "../pages/RegistrationPageMentor";

export const router = createBrowserRouter([
    {
        path: "/auth/user",
        element: <AuthorizationPageUser />
    },
    {
        path: "/auth/mentor",
        element: <AuthorizationPageMentor />
    },
    {
        path: "/reg/user",
        element: <RegistrationPageUser />
    },
    {
        path: "/reg/mentor",
        element: <RegistrationPageMentor />
    }
])