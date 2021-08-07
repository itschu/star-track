import React from "react";
import styled from "styled-components";

const Bod = styled.div`
	overflow-x: hidden;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Message = styled.div`
	height: 10rem;
	padding: 40px;
	border-radius: 30px;
	width: 25rem;
	color: red;
	background: #dcdc;
`;

const P = styled.p`
	font-family: "Monsterrat", "sans-serif";
	color: #000;
`;

const Noview = () => {
	return (
		<Bod>
			<Message>
				<h1>
					<b>Sorry!!!!</b>
				</h1>
				<P>
					<>
						This facial recognition attendance marker was not
						designed for mobile, please use a desktop or laptop to
						access this app.
					</>
				</P>
			</Message>
		</Bod>
	);
};

export default Noview;
