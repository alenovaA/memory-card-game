import { useState, useEffect } from 'react';
import fourCard from './img/4.jpeg';
import fiveCard from './img/5.jpeg';
import sixCard from './img/6.jpeg';
import sevenCard from './img/7.jpeg';
import nineCard from './img/9.jpeg';
import tenCard from './img/10.jpeg';
import JCard from './img/J.jpeg';
import QCard from './img/Q.jpeg';
import KCard from './img/K.jpeg';
import ACard from './img/A.jpeg';

const allCards = [
  { id: 1, img: fourCard},
  { id: 2, img: fiveCard},
  { id: 3, img: sixCard },
  { id: 4, img: sevenCard},
  { id: 5, img: nineCard},
  { id: 6, img: tenCard},
  { id: 7, img: JCard},
  { id: 8, img: QCard },
  { id: 9, img: KCard },
  { id: 10, img: ACard },
]


function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const pairOfAllCards = [...allCards, ...allCards];
  const [turn, setTurn] = useState(null);
  const [AlexScore, setAlexScore] = useState(0);
  const [JohnScore, setJohnScore] = useState(0);

  function playerRandom() {
    return (Math.floor(Math.random() * 2) === 0) ? 'Alex' : 'John'
  }
  const winner = calculateWinner();

  function calculateWinner() {
    if (cards.filter((card) => card.matched).length === cards.length) {
      return `Game over! Player ${AlexScore > JohnScore ? "Alex" : "John"
        } won with score  ${Math.max(AlexScore, JohnScore)}!`
    }
    else return
  }

  function changeTurn() {
    setTurn(turn => turn === 'Alex' ? 'John' : 'Alex')
  }

  function notChangeTurn() {
    if (turn === 'Alex') {
      setTurn('Alex')
    }
    else if (turn === 'John') {
      setTurn('John')
    }
  }

  const flipCard = (index) => () => {
    firstCard ? setSecondCard(index) : setFirstCard(index);

  }

  const shuffledCards = pairOfAllCards.sort(() => Math.random() - 0.5).map((card) => (
    { ...card, matched: false }
  ));

  useEffect(() => {
    setCards(shuffledCards);
    setTurn(playerRandom());
    setAlexScore(0);
    setJohnScore(0);
  }, [])
  const newGame = ()=>{
    setCards(shuffledCards);
    setTurn(playerRandom());
    setAlexScore(0);
    setJohnScore(0);
  }

  const resetChoisedCards = () => {
    setFirstCard(null);
    setSecondCard(null);
  }

  useEffect(() => {
    if (firstCard && secondCard) {

      if (firstCard.id === secondCard.id) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.id === firstCard.id) {
              return { ...card, matched: true }
            }else {
              return card
            };
          })
        })
        notChangeTurn()
        turn === 'Alex' ? setAlexScore((prev) => prev + 1) : setJohnScore((prev) => prev + 1);
      } else
        setTimeout(changeTurn, 300);
      setTimeout(resetChoisedCards, 1000);
    }
  }, [firstCard, secondCard])


  return (
    <div className="App">
      <h1 className='title'>Memory Game</h1>
      <h2 className='turn'> {winner ? winner : `Now it's ${turn}  turn!`}</h2>
      {winner ? <button className='button' onClick={newGame}>New Game</button> : ""}
      
      <div className='players'>
        <h3>Alex's score : {AlexScore}</h3>
        <h3>John's score : {JohnScore}</h3>
      </div>

      <div className='allcards'>
        {cards.map((item, index) => {
          let isFlipped;
          if (item === firstCard || item === secondCard || item.matched) isFlipped = true;
          return (
            <div key={index} className='card'>
              <div className={isFlipped ? "flipped" : ""}>
                <img className='frontside' src={item.img} alt="card" width="100" />
                <div onClick={flipCard(item)} className='backside'></div>
              </div>
            </div>)
        })}
      </div>
    </div>
  );
}

export default App;
