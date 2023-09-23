import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";

import { AuthProvider } from "./contexts/authContext.jsx";
import Logout from "./components/Logout.jsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <h1>Page Not Found</h1>,
		children: [
			{
				path: "/",
				element: <HomeScreen />,
			},
			{
				path: "/login",
				element: <LoginScreen />,
			},
			{
				path: "/register",
				element: <RegisterScreen />,
			},
			{
				path: "/logout",
				element: <Logout />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
