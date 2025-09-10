import styles from "../styles/home.module.scss";
import Link from 'next/link';

export default function Home() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>🧠 Neural Networks Playground</h1>
			<p className={styles.subtitle}>Explore interactive demos</p>
			<ul className={styles.demoList}>
				<li>
					<Link href="/xor" className={styles.demoLink}>
						XOR Demo →
					</Link>
				</li>
			</ul>
		</div>
	);
}
