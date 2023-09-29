import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import {useSelector} from 'react-redux';
function Header() {
	const username = useSelector(state=>state.auth.userInfo?.name);
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>MERN AUTH</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/">
							<Nav.Link className="icon-link">
								<svg width="16" height="16">
									<use xlinkHref="/svgs/home.svg#home"></use>
								</svg>
								Home
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/register">
							<Nav.Link className="icon-link">
								<svg width="16" height="16">
									<use xlinkHref="/svgs/register.svg#register"></use>
								</svg>
								Register
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/login">
							<Nav.Link className="icon-link">
								<svg width="16" height="16">
									<use xlinkHref="/svgs/login.svg#loginArr"></use>
									<use xlinkHref="/svgs/login.svg#loginBox"></use>
								</svg>
								Login
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/logout">
							<Nav.Link className="icon-link">
								<svg width="16" height="16">
									<use xlinkHref="/svgs/logout.svg#logoutArr"></use>
									<use xlinkHref="/svgs/logout.svg#logoutBox"></use>
								</svg>
								Logout
							</Nav.Link>
						</LinkContainer>
					</Nav>
					{username && 
						<Navbar.Text>
							Signed in as:{" "}
							<LinkContainer to="/profile">
								<a>{username}</a>
							</LinkContainer>
						</Navbar.Text>
						}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
