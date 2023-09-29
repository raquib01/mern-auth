import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function RegisterScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { userInfo, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		if(password !== confirmPassword){
			return toast.error("Password do not match")
		}
		dispatch(register({ email, name, password })).then((val) => {
			if (val) {
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
				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
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
				<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>

				<p>
					Already have an account?{" "}
					<LinkContainer to="/login">
						<a>Login</a>
					</LinkContainer>
				</p>
				<Button variant="primary" type="submit" disabled={loading}>
					{loading ? (
						<>
							<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
							Loading...
						</>
					) : (
						"Register"
					)}
				</Button>
			</Form>
		</>
	);
}

export default RegisterScreen;
