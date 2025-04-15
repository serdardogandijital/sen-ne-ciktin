
import dynamic from 'next/dynamic';
const Test = dynamic(() => import('../components/Test'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>Sen Ne Çıktın?</h1>
      <Test />
    </div>
  );
}
