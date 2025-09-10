import { predict } from "../components/exclusiveOr";
import { useState } from "react";
import styles from "../styles/xor.module.scss";
import Link from "next/link";

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
		setState((previousState) => ({
			...previousState,
			[cell]: Number(value),
		}));
	};

	const makePrediction = () => {
		setState((previousState) => ({
			...previousState,
			prediction: predict(previousState.cellOne, previousState.cellTwo),
		}));
	};

	return (
		<div className={styles.container}>
			<Link href="/" className={styles.backLink}>
				← Go Back Home
			</Link>

			<h1 className={styles.title}>🧩 Neural Network XOR Demo</h1>

			<div className={styles.truthTable}>
				<p>0 AND 0 = 0</p>
				<p>0 AND 1 = 1</p>
				<p>1 AND 0 = 1</p>
				<p>1 AND 1 = 0</p>
			</div>

			<div className={styles.form}>
				<div className={styles.inputGroup}>
					<label>Cell 1</label>
					<input
						type="number"
						value={state.cellOne}
						onChange={(event) => onChange("cellOne", event.currentTarget.value)}
					/>
				</div>

				<div className={styles.inputGroup}>
					<label>Cell 2</label>
					<input
						type="number"
						value={state.cellTwo}
						onChange={(event) => onChange("cellTwo", event.currentTarget.value)}
					/>
				</div>

				<button className={styles.predictBtn} onClick={makePrediction}>
					Predict
				</button>

				{typeof state.prediction === "number" && (
					<h3 className={styles.result}>
						Prediction: <span>{state.prediction}</span>
					</h3>
				)}
			</div>
		</div>
	);
}
