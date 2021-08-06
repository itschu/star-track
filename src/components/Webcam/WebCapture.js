import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
// import Webcam from "./components/Webcam/";

const App = ({ playState }) => {
	// console.log(playState);
	const videoHeight = 480;
	const videoWidth = 640;
	// const [playState, setplayState] = useState(playState);
	const [initializing, setInitializing] = useState(false);
	const videoRef = useRef();
	const canvasRef = useRef();
	let allFaceData = [];

	useEffect(() => {
		const loadModels = async () => {
			const MODEL_URL = process.env.PUBLIC_URL + "/models";
			setInitializing(true);
			Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
				faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
			]).then(startVideo);
		};
		if (playState) loadModels();
	}, [playState]);

	const startVideo = () => {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
		navigator.getUserMedia(
			{
				video: {},
			},
			(stream) => (videoRef.current.srcObject = stream),
			(err) => console.log(err)
		);
	};

	const handlePlay = () => {
		const run = () => {
			if (initializing) {
				setInitializing(false);
			}
			canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
				videoRef.current
			);
			const displaySize = {
				width: videoWidth,
				height: videoHeight,
			};
			faceapi.matchDimensions(canvasRef.current, displaySize);
			const interval = setInterval(async () => {
				if (playState) {
					const detections = await faceapi
						.detectAllFaces(
							videoRef.current,
							new faceapi.TinyFaceDetectorOptions()
						)
						.withFaceLandmarks()
						.withFaceExpressions()
						.withFaceDescriptors();
					const resizedDetections = faceapi.resizeResults(
						detections,
						displaySize
					);
					canvasRef.current
						.getContext("2d")
						.clearRect(0, 0, videoWidth, videoHeight);
					faceapi.draw.drawDetections(
						canvasRef.current,
						resizedDetections
					);
					faceapi.draw.drawFaceLandmarks(
						canvasRef.current,
						resizedDetections
					);
					faceapi.draw.drawFaceExpressions(
						canvasRef.current,
						resizedDetections
					);
					// console.log(resizedDetections);

					if (
						resizedDetections &&
						Object.keys(resizedDetections).length > 0
					) {
						const number = allFaceData.length;
						const thisUser = {
							name: `person${number}`,
							faceDescription: resizedDetections[0].descriptor,
						};
						allFaceData = [...allFaceData, thisUser];
						const attendanceData = allFaceData.filter(
							(el) =>
								el.faceDescription !== thisUser.faceDescription
						);
						// console.log(attendanceData);
					}
				}
			}, 1000);
			// if (!playState) clearInterval(interval);
		};
		if (playState) run();
		// run();
	};

	return (
		<>
			{playState && (
				<div>
					<span>{initializing ? "Initializing" : "Ready"}</span>
					<div className="display-flex justify-content-center">
						<video
							ref={videoRef}
							autoPlay
							muted
							height={videoHeight}
							width={videoWidth}
							onPlay={handlePlay}
						/>
						<canvas ref={canvasRef} className="position-absolute" />
					</div>
				</div>
			)}
		</>
	);
};

// export default Webcam;
export default App;
