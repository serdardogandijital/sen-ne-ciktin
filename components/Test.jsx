
import { useState } from 'react';
import questions from '../data/questions.json';
import characters from '../data/characters.json';

export default function Test() {
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
      setCoins(coins + 25);
    }
  };

  const handleShare = () => {
    setCoins(coins + 50);
    alert("Karakterini paylaştığın için +50 coin kazandın!");
  };

  if (result && character) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Sen: {result} sınıfından çıktın</h2>
        <div style={{ padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
          <div style={{ fontSize: 40 }}>{character.icon}</div>
          <h3>{character.name}</h3>
          <p>{character.description}</p>
          <p><i>Güç: {character.power}</i></p>
          <p>Seviye: {character.level}</p>
          <button onClick={handleShare}>Karakterini Paylaş (+50 coin)</button>
          <p>Toplam Coin: {coins} 💰</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>{questions[current].question}</h2>
      {questions[current].options.map((opt, idx) => (
        <button key={idx} onClick={() => handleAnswer(opt.class)} style={{
          display: 'block', marginBottom: 10, padding: 10, background: '#444', color: '#fff', borderRadius: 4
        }}>
          {opt.answer}
        </button>
      ))}
    </div>
  );
}
