import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const userInfo = useSelector((state) => state.auth.userInfo);
	const navigate = useNavigate();
	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, [userInfo, navigate]);

	return (
		userInfo && (
			<>
				<h2>Welcome... Mr. {userInfo.name}</h2>
				<p>Here is your detail...</p>
				<p>
					<strong>Email:</strong> {userInfo.email}
				</p>
				<p>
					<strong>Id:</strong> {userInfo.id}
				</p>
			</>
		)
	);
}
