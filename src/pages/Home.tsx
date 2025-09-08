import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
			<h1>Neural Networks Playground</h1>
			<p>Select a demo:</p>
			<ul>
				<li><Link to="/xor">XOR Demo</Link></li>
			</ul>
		</div>
	);
}
