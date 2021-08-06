import React from "react";
import styled from "styled-components";
import { RiCameraSwitchLine } from "react-icons/ri";
import { FaUsers, FaChartBar, FaUserAlt, FaUsersCog } from "react-icons/fa";

const Menu = styled.div`
	width: 3.4em;
	background-color: #048ba8;
	display: flex;
	position: fixed;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 100vh;
`;

const iconStyle = {
	width: "2em",
	background: "#fff",
	height: "2em",
	margin: "2px 0",
	padding: "11px",
	cursor: "pointer",
	color: "#2F2D2E",
};

const TopMenu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const BottomMenu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Camera = styled(RiCameraSwitchLine)`
	${iconStyle}
`;
const Users = styled(FaUsers)`
	${iconStyle}
`;
const Chart = styled(FaChartBar)`
	${iconStyle}
`;
const User = styled(FaUserAlt)`
	${iconStyle}
`;
const Cog = styled(FaUsersCog)`
	${iconStyle}
`;

const Navigation = () => {
	return (
		<div>
			<Menu>
				<TopMenu>
					<Camera />
					<Users />
					<Chart />
				</TopMenu>

				<BottomMenu>
					<User />
					<Cog />
				</BottomMenu>
			</Menu>
		</div>
	);
};

export default Navigation;
