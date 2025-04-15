
import { useState } from 'react';
import questions from '../data/questions.json';
import characters from '../data/characters.json';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState({
    Dijital: 0, Mesleki: 0, Gündelik: 0, Sürreal: 0, "Mini Ego": 0
  });
  const [result, setResult] = useState(null);
  const [character, setCharacter] = useState(null);
  const [coins, setCoins] = useState(0);

  const handleAnswer = (cls) => {
    const updated = { ...score };
    updated[cls]++;
    setScore(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const topClass = Object.entries(updated).sort((a,b)=>b[1]-a[1])[0][0];
      const charList = characters[topClass];
      const randomChar = charList[Math.floor(Math.random() * charList.length)];
      setCharacter(randomChar);
      setResult(topClass);
      setCoins(25);
    }
  };

  const handleShare = () => {
    setCoins(coins + 50);
    alert("Paylaştığın için +50 coin kazandın!");
  };

  if (result && character) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>{result} sınıfından çıktın!</h2>
        <div style={{
          background: '#fff',
          padding: 20,
          border: '2px solid #222',
          borderRadius: 12,
          margin: '20px auto',
          maxWidth: 500
        }}>
          <div style={{ fontSize: '3rem' }}>{character.icon}</div>
          <h3>{character.name}</h3>
          <p>{character.description}</p>
          <p><strong>Güç:</strong> {character.power}</p>
          <p><strong>Seviye:</strong> {character.level}</p>
          <button onClick={handleShare}>Karakteri Paylaş (+50 Coin)</button>
          <p style={{ marginTop: 10 }}>Toplam Coin: {coins} 💰</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>{questions[current].question}</h2>
      {questions[current].options.map((opt, idx) => (
        <button key={idx} onClick={() => handleAnswer(opt.class)} style={{
          display: 'block',
          width: '100%',
          marginBottom: 10,
          padding: 10,
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: 6
        }}>
          {opt.answer}
        </button>
      ))}
    </div>
  );
}
