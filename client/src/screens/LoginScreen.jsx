import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { useAuthDispatch } from "../contexts/authContext";
function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const authDispatch = useAuthDispatch();

	async function handleSubmit(e) {
		e.preventDefault();
		authDispatch({type: 'Loading'});
		try {
			const res = await fetch(import.meta.env.VITE_API_BASE + "/auth/login", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			
			if (res.ok) {
				const jsonRes = await res.json();
				authDispatch({type: 'setCredentials', payload: jsonRes.data.user.name});
				alert(jsonRes.message);
			}else{
				const errorRes = await res.json();
				authDispatch({type: 'error'});
				alert(errorRes.message || "An error occurred. Please try again later");
			}
		} catch (err) {
			console.error("Error while login user", err);
			authDispatch({type: 'error'});
			alert("An error occurred. Please try again later");
		}
	}
	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Form.Text className="text-muted">
					We will never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>

			<p>
				New User?{" "}
				<LinkContainer to="/register">
					<a>Register Yourself</a>
				</LinkContainer>
			</p>
			<Button variant="primary" type="submit">
				Login
			</Button>
		</Form>
	);
}

export default LoginScreen;
