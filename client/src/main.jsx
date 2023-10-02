import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import Logout from "./components/Logout.jsx";

import { Provider } from "react-redux";
import store from "./store.js";
import Profile from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
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
			{
				path: "",
				element: <ProtectedRoute />,
				children: [
					{
						path: "/profile",
						element: <Profile />,
					},
				],
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
