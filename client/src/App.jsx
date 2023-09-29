import { Outlet } from "react-router-dom";
import "./App.css";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<>
			<Header />
			<ToastContainer autoClose={2000} />
			<Container className="my-5">
				<Outlet />
			</Container>
		</>
	);
}

export default App;
