import React, { useState } from "react";
import "./login.css";
import styled from "styled-components";

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	background: #000000b0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Loader = styled.div`
	border: 5px solid #f3f3f3;
	border-top: 5px solid #555;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: spin 2s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const Login = ({ changeLogin, data, setData, originalData }) => {
	const [failedAttempt, setFailedAttempt] = useState(false);
	const [overlay, setOverlay] = useState(false);
	const logFunc = (e) => {
		e.preventDefault();
		if (originalData.id === data.id && originalData.id === data.id) {
			setOverlay(true);
			setTimeout(() => {
				changeLogin(true);
			}, 1000);
		} else {
			setFailedAttempt(true);
		}
	};
	return (
		<div className="body">
			<div className="centerX">
				<h1>Login</h1>
				{failedAttempt && (
					<h3 className="error">
						Please use the correct testing details below <br></br>
						Zone ID : blwzoneH
						<br />
						Password : qwerty
					</h3>
				)}
				<form method="post">
					<div className="txt_field">
						<input
							type="text"
							required
							value={data.id}
							onChange={(e) => {
								return setData({ ...data, id: e.target.value });
							}}
						/>
						<span></span>
						<label>Zone Id</label>
					</div>
					<div className="txt_field">
						<input
							type="password"
							required
							value={data.pass}
							onChange={(e) =>
								setData({ ...data, pass: e.target.value })
							}
						/>
						<span></span>
						<label>Password</label>
					</div>
					<div className="pass">Forgot Password?</div>
					<input
						type="submit"
						value="Login"
						onClick={(e) => logFunc(e)}
					/>
					<div className="signup_link"></div>
				</form>
			</div>
			{overlay && (
				<Overlay>
					<Loader />
				</Overlay>
			)}
		</div>
	);
};

export default Login;
