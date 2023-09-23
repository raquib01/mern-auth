import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
export default function Hero() {
	return (
		<Card style={{ width: "80%" }}>
			<Card.Body>
				<Card.Title>Mern Auth</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">User Authentication</Card.Subtitle>
				<Card.Text>
					This Web App is dedicated to MERN Authentication. It performs Registration and
					Authentication of the user. It Stores JWT Token in Http Only Cookies. It also uses Redux
					Toolkit and React Bootstrap Library
				</Card.Text>
				<LinkContainer to="/login">
					<Button variant="outline-primary" size="sm" className="me-2">
						Login
					</Button>
				</LinkContainer>
				<LinkContainer to="/register">
					<Button variant="outline-danger" size="sm" className="me-2">
						Register
					</Button>
				</LinkContainer>
			</Card.Body>
		</Card>
	);
}
