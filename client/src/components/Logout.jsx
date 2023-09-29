import { Container, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
export default function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo, loading } = useSelector((state) => state.auth);

	function handleLogout() {
		dispatch(logout()).then((val) => {
			if(val){
				navigate("/");
			}
		});
	}

	if (!userInfo) {
		return <h1>You&apos;re already Logout</h1>;
	}
	return (
		<Container>
			<h1>Log Out from your account</h1>
			<Button
				variant="outline-primary"
				size="sm"
				className="me-2"
				onClick={handleLogout}
				disabled={loading}
			>
				{loading ? (
					<>
						<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
						Loading...
					</>
				) : (
					"Logout"
				)}
			</Button>
		</Container>
	);
}
