import { predict } from "../components/exclusiveOr";
import { useState } from "react";
import styles from "../styles/xor.module.scss";
import Link from "next/link";
import { Scatter } from "react-chartjs-2";
import {
	Chart as ChartJS,
	PointElement,
	LinearScale,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend);

export default function Xor() {
	const [state, setState] = useState<{
		cellOne: number;
		cellTwo: number;
		prediction: number | null;
	}>({
		cellOne: 0,
		cellTwo: 0,
		prediction: null,
	});

	const onChange = (cell: string, value: string) => {
		setState((prev) => ({
			...prev,
			[cell]: Number(value),
		}));
	};

	const makePrediction = () => {
		setState((prev) => ({
			...prev,
			prediction: predict(prev.cellOne, prev.cellTwo),
		}));
	};

	// XOR truth points
	const points = [
		{ x: 0, y: 0, label: 0 },
		{ x: 0, y: 1, label: 1 },
		{ x: 1, y: 0, label: 1 },
		{ x: 1, y: 1, label: 0 },
	];

	const chartData = {
		datasets: [
			{
				label: "Truth Table Points",
				data: points,
				backgroundColor: points.map((p) =>
					p.label === 1 ? "rgba(255,90,95,0.8)" : "rgba(100,100,255,0.8)"
				),
				pointRadius: 8,
			},
			{
				label: "Your Input",
				data: [{ x: state.cellOne, y: state.cellTwo }],
				backgroundColor: "yellow",
				pointRadius: 10,
			},
		],
	};

	const chartOptions = {
		scales: {
			x: {
				min: -0.2,
				max: 1.2,
				ticks: { stepSize: 1 },
			},
			y: {
				min: -0.2,
				max: 1.2,
				ticks: { stepSize: 1 },
			},
		},
		plugins: {
			legend: { display: true },
			title: { display: true, text: "XOR Input Space" },
		},
	};

	return (
		<div className={styles.container}>
			<Link href="/" className={styles.backLink}>
				← Back to Home
			</Link>

			<h1 className={styles.title}>🧠 XOR Neural Network Playground</h1>
			<p className={styles.subtitle}>Plot your inputs and see how the model predicts</p>

			<div className={styles.chartWrapper}>
				<Scatter data={chartData} options={chartOptions} />
			</div>

			<div className={styles.form}>
				<div className={styles.inputGroup}>
					<label>Cell 1</label>
					<input
						type="number"
						value={state.cellOne}
						onChange={(e) => onChange("cellOne", e.currentTarget.value)}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label>Cell 2</label>
					<input
						type="number"
						value={state.cellTwo}
						onChange={(e) => onChange("cellTwo", e.currentTarget.value)}
					/>
				</div>
				<button className={styles.predictBtn} onClick={makePrediction}>
					Predict →
				</button>
				{typeof state.prediction === "number" && (
					<div className={styles.result}>
						Prediction: <span>{state.prediction}</span>
					</div>
				)}
			</div>
		</div>
	);
}
