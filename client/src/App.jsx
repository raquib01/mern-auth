import { Outlet } from "react-router-dom";
import "./App.css";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
function App() {
	return (
		<>
			<Header />
			<Container className="my-5">
				<Outlet />
			</Container>
		</>
	);
}

export default App;
