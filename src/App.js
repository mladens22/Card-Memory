import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';
import 'animate.css';



const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //2x each card (12 total)
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));


    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);  //reset the turns back to 0 every time we click on the new game

  }

  //handle a choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare two cards 
  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    } 
  },[choiceOne, choiceTwo])  // it fires function everytime choiceOne and choiceTwo is changed

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  //start new game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">

      <h1 className='animate__animated animate__pulse animate__delay-2s '>Mladen's Memory Game</h1>
      <button onClick={shuffleCards}> New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}   //card = prop

            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className='turns'>Turns :  {turns}</p>
    </div>
  );
}

export default App;