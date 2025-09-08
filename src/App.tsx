import { predict } from './exclusiveOr';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Neural Network XOR Demo</h1>
      <p>0 XOR 0 = {predict(0, 0)}</p>
      <p>0 XOR 1 = {predict(0, 1)}</p>
      <p>1 XOR 0 = {predict(1, 0)}</p>
      <p>1 XOR 1 = {predict(1, 1)}</p>
    </div>
  );
}
