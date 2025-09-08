import { Link } from "react-router-dom";
import { predict } from "../components/exclusiveOr";
import { useState } from "react";

export default function XorDemo() {
	const [state, setState] = useState<{ cellOne: number, cellTwo: number, prediction: number | null }>({
		cellOne: 0,
		cellTwo: 0,
		prediction: null,
	});

	const onChange = (cell: string, value: string) => {
		setState(previousState => ({
			...previousState,
			[cell]: Number(value)
		}));
	}

	const makePrediction = () => {
		setState(previousState => ({
			...previousState,
			prediction: predict(previousState.cellOne, previousState.cellTwo),
		}));
	}

	return (
		<div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
			<Link to="/">Go Back Home</Link>

			<h1>Neural Network XOR Demo</h1>

			<p>0 AND 0 = 0</p>
			<p>0 AND 1 = 1</p>
			<p>1 AND 0 = 1</p>
			<p>1 AND 1 = 0</p>

			<div>
				<div>
					<label>Cell 1: </label>
					<input
						type='number'
						value={state.cellOne}
						onChange={(event) => onChange('cellOne', event.currentTarget.value)}
					/>
				</div>
				<div>
					<label>Cell 2: </label>
					<input
						type='number'
						value={state.cellTwo}
						onChange={(event) => onChange('cellTwo', event.currentTarget.value)}
					/>
				</div>

				<button style={{ marginTop: '1rem' }} onClick={makePrediction}>Predict</button>

				{ typeof state.prediction === 'number' && <h3>Predction: {state.prediction}</h3> }
			</div>
		</div>
	)
}
