import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { login_credentials } from "./data";

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState(login_credentials[0]);
	const originalData = login_credentials[0];
	return (
		<div>
			{loggedIn ? (
				<Home />
			) : (
				<Login
					changeLogin={setLoggedIn}
					data={userData}
					setData={setUserData}
					originalData={originalData}
				/>
			)}
		</div>
	);
};

export default App;
