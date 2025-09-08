import * as brain from 'brain.js';

const network = new brain.NeuralNetwork({ hiddenLayers: [3] });

const trainingData = [
	{ input: [0, 0], output: [0] },
	{ input: [0, 1], output: [1] },
	{ input: [1, 0], output: [1] },
	{ input: [1, 1], output: [0] },
]

network.train(trainingData);

export const prediction = Math.round(network.run([0, 0]) as unknown as number);
