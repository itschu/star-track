import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Navigation from "./components/Navigation";
import Noview from "./components/Noview";
import Webcam from "./components/Webcam";

const Body = styled.div`
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-columns: 2fr 1fr;
	overflow-x: auto;
	background-color: #2f2d2e;
	@media (max-width: 868px) {
		grid-template-columns: 1fr;
	}
`;

const CamStats = styled.div`
	@media (max-width: 868px) {
		padding-left: 3.4em;
	}
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const WebcamContainer = styled.div`
	@media (max-width: 868px) {
		height: 60vh;
		border-right: none;
	}
	padding-top: 30px;
	padding-left: 3.4em;
	/* width: 60em; */
	display: flex;
	justify-content: center;
	align-items: center;
	border-right: 1px solid #8f8f8f;
	flex-direction: column;
	/* background-color: Red; */
`;

const Home = () => {
	const [winWidth, setWinWidth] = useState(() => {
		const { innerWidth: width } = window;
		return width;
	});

	useEffect(() => {
		window.addEventListener("resize", () => setWidth());
		return () => {
			window.removeEventListener("resize", () => setWidth());
		};
	}, [winWidth]);

	const setWidth = () => {
		function getWindowDimensions() {
			const { innerWidth: width } = window;
			return width;
		}
		const width = getWindowDimensions();
		setWinWidth(width);
	};

	const [showStartC, setShowStartC] = useState(false);

	return winWidth > 800 ? (
		<>
			<Navigation />
			<Body>
				<WebcamContainer>
					<div className="webcam">
						<Webcam playState={showStartC} />
					</div>
					{showStartC || (
						<button
							className="btn"
							onClick={() => setShowStartC(!showStartC)}
						>
							{" "}
							Start Capture
						</button>
					)}
				</WebcamContainer>

				<CamStats>
					<div className="mainStat">
						<div className="">
							<h2 className="alignCenter mainNum cat totalNum">
								50
							</h2>
							<h2 className="alignCenter white mont negMar">
								Total
							</h2>
						</div>
					</div>

					<div className="membersStat d-f">
						<div className="totalMembers">
							<h2 className="alignCenter cat smB">29</h2>
						</div>
						<h2 className="alignCenter white mont smF">Members</h2>
					</div>

					<div className="firstTimersStat d-f">
						<div className="totalFirstTimers ">
							<h2 className="alignCenter cat smB">11</h2>
						</div>
						<h2 className="alignCenter white mont smF">
							First Timers
						</h2>
					</div>

					<button className="btn">View All</button>
				</CamStats>
			</Body>
		</>
	) : (
		<Noview />
	);
};

export default Home;
