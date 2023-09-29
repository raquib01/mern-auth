import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/authSlice";

function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { userInfo, loading } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		dispatch(login({ email, password })).then((val) => {
			if(val){
				navigate("/profile");
			}
		});
	}

	if (userInfo) {
		return <h1>You&apos;re already Logged In</h1>;
	}
	return (
		<>
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
				<Button variant="primary" type="submit" disabled={loading}>
					{loading ? (
						<>
							<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							Loading...
						</>
					) : (
						"Login"
					)}
				</Button>
			</Form>
		</>
	);
}

export default LoginScreen;
