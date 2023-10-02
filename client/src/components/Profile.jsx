import { useSelector } from "react-redux";

export default function Profile() {
	const userInfo = useSelector((state) => state.auth.userInfo);

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
