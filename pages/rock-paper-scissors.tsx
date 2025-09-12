"use client";

import { useMemo, useRef, useState } from "react";
import brain from "brain.js";
import styles from "../styles/rock-paper-scissors.module.scss";
import Link from "next/link";

type Move = "rock" | "paper" | "scissors";
const MOVES: { type: Move; icon: string }[] = [
	{ type: "rock", icon: "🪨" },
	{ type: "paper", icon: "📄" },
	{ type: "scissors", icon: "✂️" },
];
const encodeMove = (m: Move) =>
	m === "rock" ? [1, 0, 0] : m === "paper" ? [0, 1, 0] : [0, 0, 1];

const decodeMove = (out: number[] | Record<string, number>): Move => {
	const arr = Array.isArray(out)
		? out
		: [out.rock ?? 0, out.paper ?? 0, out.scissors ?? 0];
	const i = arr.indexOf(Math.max(...arr));
	return MOVES[i].type;
};

const counterOf = (m: Move): Move =>
	m === "rock" ? "paper" : m === "paper" ? "scissors" : "rock";

const WINDOW = 3;
const randomMove = () => MOVES[Math.floor(Math.random() * 3)].type;

export default function RockPaperScissors() {
	const net = useMemo(
		() => new brain.NeuralNetwork({ hiddenLayers: [8, 6] }),
		[]
	);

	const trainingRef = useRef<
		Array<{ input: number[]; output: number[] | Record<string, number> }>
	>([]);
	const historyRef = useRef<Move[]>([]);

	const [result, setResult] = useState<{ text: string; status: string } | null>(
		null
	);
	const [score, setScore] = useState({ you: 0, ai: 0, draw: 0 });
	const [lastRound, setLastRound] = useState<{ you?: Move; ai?: Move }>({});

	const canPredict = () => trainingRef.current.length >= 10;

	const predictNextUserMove = (): Move | null => {
		const h = historyRef.current;
		if (h.length < WINDOW || !canPredict()) return null;
		const inputVec = h.slice(-WINDOW).map(encodeMove).flat();
		const out = net.run(inputVec as any) as number[] | Record<string, number>;
		return decodeMove(out);
	};

	const trainIncremental = () => {
		net.train(trainingRef.current, {
			iterations: 150,
			learningRate: 0.05,
			log: false,
		});
	};

	const play = (you: Move) => {
		const predictedUser = predictNextUserMove();

		const ai =
			Math.random() < 0.2
				? randomMove()
				: counterOf(predictedUser ?? randomMove());

		let msg: { text: string; status: string };
		if (you === ai) {
			msg = { text: `🤝 Draw! You both chose ${you}.`, status: "draw" };
			setScore((s) => ({ ...s, draw: s.draw + 1 }));
		} else if (
			(you === "rock" && ai === "scissors") ||
			(you === "paper" && ai === "rock") ||
			(you === "scissors" && ai === "paper")
		) {
			msg = { text: `🎉 You win! You: ${you} vs AI: ${ai}`, status: "win" };
			setScore((s) => ({ ...s, you: s.you + 1 }));
		} else {
			msg = { text: `😈 AI wins! You: ${you} vs AI: ${ai}`, status: "lose" };
			setScore((s) => ({ ...s, ai: s.ai + 1 }));
		}
		setResult(msg);
		setLastRound({ you, ai });

		historyRef.current = [...historyRef.current, you];

		const h = historyRef.current;
		if (h.length > WINDOW) {
			const inputVec = h.slice(-(WINDOW + 1), -1).map(encodeMove).flat();
			const outputVec = encodeMove(you);
			trainingRef.current.push({ input: inputVec, output: outputVec });

			if (trainingRef.current.length > 100) {
				trainingRef.current.splice(0, trainingRef.current.length - 100);
			}

			trainIncremental();
		}
	};


	const reset = () => {
		trainingRef.current = [];
		historyRef.current = [];
		setScore({ you: 0, ai: 0, draw: 0 });
		setResult(null);
		setLastRound({});
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>🎮 Rock–Paper–Scissors with AI</h1>

			<div className={styles.nav}>
				<Link href="/" className={styles.backLink}>
					← Back to Home
				</Link>
			</div>

			<div className={styles.controls}>
				{MOVES.map((m) => (
					<button
						key={m.type}
						onClick={() => play(m.type)}
						className={styles.btn}
					>
						{m.icon} {m.type}
					</button>
				))}
				<button onClick={reset} className={styles.resetBtn}>
					🔄 Reset
				</button>
			</div>

			{result && (
				<p className={`${styles.result} ${styles[result.status]}`}>
					{result.text}
				</p>
			)}

			<div className={styles.scoreboard}>
				<p>🙋 You: {score.you}</p>
				<p>🤖 AI: {score.ai}</p>
				<p>🤝 Draws: {score.draw}</p>
			</div>

			<div className={styles.lastRound}>
				{lastRound.you && (
					<p>
						Last round → You: <strong>{lastRound.you}</strong> | AI:{" "}
						<strong>{lastRound.ai}</strong>
					</p>
				)}
			</div>
		</div>
	);
}
