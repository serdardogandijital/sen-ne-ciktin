
import dynamic from 'next/dynamic';
const Quiz = dynamic(() => import('../components/Quiz'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>Sen Ne Çıktın?</h1>
      <Quiz />
    </div>
  );
}
