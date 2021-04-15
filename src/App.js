import * as React from 'react';
import './App.css';

import { productData } from './app-data'

const App = () => {
  const formRef = React.useRef();
  const [activePlayer, setActivePlayer] = React.useState(1);
  const [player1Guess, setPlayer1Guess] = React.useState(0);
  const [player2Guess, setPlayer2Guess] = React.useState(0);
  const [currentGuess, setCurrentGuess] = React.useState(0);
  const [input, setInput] = React.useState('');
  const [activeItem] = React.useState(
    productData[Math.floor(Math.random() * productData.length)]
  );
  const [winningPlayer, setWinningPlayer] = React.useState();

  React.useEffect(() => {
    if (activePlayer === 1 && currentGuess) {
      setPlayer1Guess(currentGuess)
    }

    if (activePlayer === 2 && currentGuess) {
      setPlayer2Guess(currentGuess);
    }

    if (activePlayer === 3) {
      let winner;
      const price = activeItem.price;

      if (Number(player1Guess) > price) {
        winner = 2;
      } else if (Number(player2Guess) > price) {
        winner = 1;
      } else {
        winner =
          Math.abs(price - player1Guess) < Math.abs(price - player2Guess)
            ? 1
            : 2;
      }

      setWinningPlayer(winner);
    }

  }, [activeItem.price, activePlayer, currentGuess, player1Guess, player2Guess, winningPlayer]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentGuess(input);
    setActivePlayer(activePlayer + 1);
    setInput("");
    formRef?.current?.reset();
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <Header activePlayer={activePlayer} />
      <section className="product-bid-container">
        <ProductData activeItem={activeItem} />
        <BidForm
          formRef={formRef}
          handleFormSubmit={handleFormSubmit}
          handleChange={handleChange}
        />
      </section>
      {winningPlayer && <GameOverBanner winningPlayer={winningPlayer} />}
    </div>
  );
}

export default App;

const ProductData = ({ activeItem }) => {
  return (
    <div className="product-data">
      <img className="product-image" src={activeItem.image} alt="" />
      <p className="product-description">{activeItem?.itemName}</p>
    </div>
  );
}

const Header = ({ activePlayer }) => {
  const player = activePlayer > 2 ? 2 : activePlayer;
  return (
    <header className="App-header">
      <h1>Who's playing: Player {player}</h1>
    </header>
  );
};

const BidForm = ({ formRef, input, handleFormSubmit, handleChange }) => {
  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="bid-form">
      <label for="bid-form" className="form-label">
        Your Bid:
      </label>
      <input
        onChange={(e) => handleChange(e)}
        type="text"
        id="bid-form"
        value={input}
      />
      <button
        onClick={(e) => handleFormSubmit(e)}
        type="submit"
        className="btn"
      >
        Submit
      </button>
    </form>
  );
};

const GameOverBanner = ({ winningPlayer }) => <p className="winning-banner">{winningPlayer} won the game</p>;
