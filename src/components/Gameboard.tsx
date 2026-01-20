import { JSX, useCallback, useEffect, useState } from "react";
import { colors } from "../constants/colors";
import { LightButton } from "./LightButton";

const Gameboard = (): JSX.Element => {
  const [gameSequence, setGameSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isUserTurn, setIsUserTurn] = useState<boolean>(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [currScore, setcurrScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [startGame, setStartedGame] = useState<boolean>(false);

  // To handle game over and update high score & Reset game state
  useEffect(() => {
    if (gameOver) {
      if (currScore > highScore) {
        setHighScore(currScore);
      }
      setcurrScore(0);
      setGameSequence([]);
      setUserSequence([]);
      setIsUserTurn(false);
      setActiveColorIndex(null);
    }
  }, [gameOver, currScore, highScore]);

  const handleStartGame = useCallback(() => {
    setStartedGame(true);
    setGameOver(false);
    setcurrScore(0);
    setGameSequence([]);
    setUserSequence([]);
    setIsUserTurn(false);
    setActiveColorIndex(null);
    const newColorIndex = Math.floor(Math.random() * colors.length);
    setGameSequence((prevSequence) => [...prevSequence, newColorIndex]);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startGame) {
      let delay = 1500;
      interval = setInterval(() => {
        const newColorIndex = Math.floor(Math.random() * colors.length);
        setActiveColorIndex(newColorIndex);
        setTimeout(() => {
          setActiveColorIndex(null);
        }, 1000);
        setGameSequence((prevSequence) => [...prevSequence, newColorIndex]);
      }, delay);
      if (gameOver) clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [startGame, gameOver]);

  const handleUserClick = (colorIndex: number) => {
    if (gameOver) return;

    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);

    const currentStep = newUserSequence.length - 1;
    if (newUserSequence[currentStep] !== gameSequence[currentStep]) {
      setGameOver(true);
      return;
    }
    setcurrScore((prevScore) => prevScore + 1);
  };

  console.log("Game Sequence:", gameSequence);

  return (
    <div>
      {colors.map((color, index) => (
        <LightButton
          onClick={() => handleUserClick(index)}
          color={color}
          isActive={activeColorIndex === index}
        />
      ))}
      <button onClick={handleStartGame}>
        {currScore === 0 && !gameOver ? "Start Game" : "New Game"}
      </button>
      <div>
        Current score: {currScore} | High Score: {highScore}
      </div>
      {gameOver && <div>Game Over!</div>}
      <p>Remember the sequence of lights and repeat it!</p>
    </div>
  );
};

export default Gameboard;
