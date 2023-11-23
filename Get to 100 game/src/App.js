import { useState, useEffect } from "react";
import PlayersRegistration from "./Components/PlayersRegistration"
import GameScreen from "./Components/GameScreen";


function App() {
  let [players, setPlayers] = useState(localStorage["players"] ? JSON.parse(localStorage.getItem("players")) : []);
  let [display, setDisplay] = useState(true);
  let [userChoosePlayers, setUserChoosePlayers] = useState([])
  let [playersInGame, setPlayersInGame] = useState([]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players))
  }, [players])

  const changeDisplay = () => {
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }
  const addPlayer = () => {
    let playerName = prompt("בחר שם לשחקן החדש");
    if (playerName !== null) {
      if (playerName !== '') {
        const newPlayer = { playerID: players.length, name: playerName, victories: 0, stepsHistory: [] };
        setPlayers([...players, newPlayer]);
      } else {
        alert("🧒 לא הכנסת שם! נסה שוב")
      }
    }
  }
  const goBack = () => {//מיועד לאיפוס נתונים בעת סיום משחק
    setUserChoosePlayers([]);
    setPlayersInGame([]);
    changeDisplay();
  }
  const changePlayerName = (index, newName) => {
    players[index].name = newName;
  }
  const updatePlayerVictories = (index, steps) => {
    console.log(players);
    players[index].victories = players[index].victories + 1;
    players[index].stepsHistory.push(steps);
    localStorage.setItem("players", JSON.stringify(players))
  }
  const updatePlayersInGame = (player) => {
    if (!userChoosePlayers.includes(player)) {
      setUserChoosePlayers([...userChoosePlayers, player])
      console.log(userChoosePlayers)
    }

  }
  const removePlayersInGame = (player) => {
    for (let i = 0; i < userChoosePlayers.length; i++) {
      if (userChoosePlayers[i].playerID === player.playerID) {
        delete userChoosePlayers[i];
        userChoosePlayers.sort()
        userChoosePlayers.pop()
      }
    }
  }

  const startGame = () => {
    choosePlayersInGame()
    changeDisplay()
  }
  const choosePlayersInGame = () => {
    for (let index = 0; index < 4; index++) {
      let currentPlayer = { id: index + 1, playerID: userChoosePlayers[index].playerID, name: userChoosePlayers[index].name, victories: userChoosePlayers[index].victories, steps: 0, number: Math.floor((Math.random() * 100)) }
      playersInGame.push(currentPlayer)
      setPlayersInGame([...playersInGame])
    }
  }

  //return component
  return (
    <div>
      {display ? <PlayersRegistration players={players} addPlayer={addPlayer} startGame={startGame} changePlayerName={changePlayerName} updatePlayersInGame={updatePlayersInGame} playersInGame={userChoosePlayers} removePlayersInGame={removePlayersInGame} /> :
        <GameScreen players={players} updatePlayerVictories={updatePlayerVictories} playersInGame={playersInGame} goBack={goBack} setPlayersInGame={setPlayersInGame} />}
    </div>)
}

export default App;
