import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
	user: "",
	isLoggedIn: false,
	isLoading: false,
};

function authReducer(state, action) {
	switch (action.type) {
		case "setCredentials": {
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
				isLoading: false,
			};
		}

		case "clearCredentials": {
			return {
				...state,
				user: "",
				isLoggedIn: false,
				isLoading: false,
			};
		}

		case "Loading": {
			return {
				...state,
				isLoading: true,
			};
		}

		case "error": {
			return {
				...state,
				isLoading: false,
			};
		}

		default: {
			return state;
		}
	}
}

const AuthDispatchContext = createContext();
const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [auth,authDispatch] = useReducer(authReducer,initialState);
	useEffect(() => {
		async function getUser() {
			authDispatch({type: 'Loading'});
			try {
				const res = await fetch(import.meta.env.VITE_API_BASE + "/auth/user", {
					method: "GET",
					credentials: "include",
				});
				
				if (res.ok) {
					const jsonRes = await res.json();
					authDispatch({type: 'setCredentials', payload: jsonRes.data.user.name});
				}else{
					authDispatch({type: 'error'});
				}
			} catch (err) {
				console.error("Error while authorizing user on page load", err);
				authDispatch({type: 'error'});
				alert("An error occurred. Please try again later");
			}
		}

		getUser();
	}, []);

	return (
		<AuthContext.Provider value={auth}>
			<AuthDispatchContext.Provider value={authDispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthContext.Provider>

	)
}

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}

export function useAuthDispatch() {
	const context = useContext(AuthDispatchContext);
	return context;
}
