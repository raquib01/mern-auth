import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useAuthDispatch } from "../contexts/authContext";
export default function Logout() {
	const authDispatch = useAuthDispatch();
	console.log();
	async function handleLogout(){
		authDispatch({type: 'Loading'});
		try {
			const res = await fetch(import.meta.env.VITE_API_BASE + "/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			
			if (res.ok) {
				authDispatch({type: 'clearCredentials'});
				alert("You have been successfully Logout");
			}else{
				const errorRes = await res.json();
				authDispatch({type: 'error'});
				alert(errorRes.message || "An error occurred. Please try again later");
			}
		} catch (err) {
			console.error("Error while logout user", err);
			authDispatch({type: 'error'});
			alert("An error occurred. Please try again later");
		}
	}
	return (
		<Container>
			<h1>Log Out from your account</h1>
				<Button variant="outline-primary" size="sm" className="me-2" onClick={handleLogout}>
					Logout
				</Button>
		</Container>
	);
}
