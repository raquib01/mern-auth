import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
	userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
			state.loading = false;
			state.error = null;
		},
		clearCredentials: (state) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
			state.loading = false;
			state.error = null;
		},
		setLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		setError: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const actions = authSlice.actions;

export function login(credentials) {
	return async function (dispatch) {
		dispatch(actions.setLoading());
		try {
			const res = await fetch(import.meta.env.VITE_API_BASE + "/auth/login", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials),
			});

			const jsonRes = await res.json();

			if (res.ok) {
				dispatch(actions.setCredentials(jsonRes.data.user));
				toast("Successful Login");
				return true;
			} else {
				dispatch(actions.setError(jsonRes.message || "An error occured. Please try again later"));
				toast.error(jsonRes.message || "An error occured. Please try again later");
			}
		} catch (err) {
			console.error("Error while login user", err);
			dispatch(actions.setError("An error occured. Please try again later"));
			toast.error("An error occured. Please try again later");
		}
	};
}

export function register(credentials) {
	return async function (dispatch) {
		dispatch(actions.setLoading());
		try {
			const res = await fetch(import.meta.env.VITE_API_BASE + "/auth/register", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials),
			});

			const jsonRes = await res.json();
			if (res.ok) {
				dispatch(actions.setCredentials(jsonRes.data.user));
				toast("Registered Successfully");
				return true;
			} else {
				dispatch(actions.setError(jsonRes.message || "An error occured. Please try again later"));
				toast.error(jsonRes.message || "An error occured. Please try again later");
			}
		} catch (err) {
			console.error("Error while registering user", err);
			dispatch(actions.setError("An error occurred. Please try again later"));
			toast.error("An error occured. Please try again later");
		}
	};
}

export function logout() {
	return async function (dispatch) {
		dispatch(actions.setLoading());
		try {
			const res = await fetch(import.meta.env.VITE_API_BASE + "/auth/logout", {
				method: "POST",
				credentials: "include",
			});

			if (res.ok) {
				dispatch(actions.clearCredentials());
				toast("Logout Successfully");
				return true;
			} else {
				const errorRes = await res.json();
				dispatch(actions.setError(errorRes.message || "An error occurred. Please try again later"));
				toast.error(errorRes.message || "An error occured. Please try again later");
			}
		} catch (err) {
			console.error("Error while logout user", err);
			dispatch(actions.setError("An error occurred. Please try again later"));
			toast.error("An error occured. Please try again later");
		}
	};
}

export default authSlice.reducer;
