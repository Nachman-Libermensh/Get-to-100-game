import { useState, useEffect } from "react";
import PlayerScreen from "./PlayerScreen";
import classes from "./GameScreen.module.css";
import img from "../assets/images/חץ משחק שמאלה.svg";

function GameScreen(props) {
      let [queue, setQueue] = useState(0);
      let [transform, setTransform] = useState({ transform: "rotate(90deg)" })
      const updateQueue = () => {
            if (queue < props.playersInGame.length) {
                  setQueue(queue + 1)
            } else {
                  setQueue(1);
            }
      }
      useEffect(() => {
            switch (queue) {
                  case 1:
                        setTransform(({ transform: "rotate(90deg)" }))
                        break;
                  case 2:
                        setTransform(({ transform: "rotate(360deg)" }))
                        break;
                  case 3:
                        setTransform(({ transform: "rotate(180deg)" }))
                        break;
                  case 4:
                        setTransform(({ transform: "rotate(270deg)" }))
                        break;
                  default:
                        break;
            }
      }, [queue])

      const removePlayersFromGame = (player) => {
            for (let i = 0; i < props.playersInGame.length; i++) {
                  if (props.playersInGame[i].playerID === player.playerID) {
                        delete props.playersInGame[i];
                        props.playersInGame.sort((a, b) => { return a.id - b.id });
                        props.playersInGame.pop();
                        props.setPlayersInGame([...props.playersInGame])
                  }
            }
            for (let i = 0; i < props.playersInGame.length; i++) {
                  props.playersInGame[i].id = i + 1;
            }
            props.setPlayersInGame([...props.playersInGame])
            setQueue(1);
      }


      return (
            <div >
                  <div className={classes.GameScreen} >
                        <div className={classes.goBackButton} onClick={props.goBack}><span>חזור לכניסה</span></div>
                        {props.playersInGame.map((player) => <PlayerScreen queue={queue} setQueue={updateQueue} player={player} className={classes.PlayerScreen} classes={classes} updatePlayerVictories={props.updatePlayerVictories} goBack={props.goBack} removePlayersFromGame={removePlayersFromGame} />)}
                        <img className={classes.queuImg} src={img} style={transform} />
                  </div>
            </div>
      )
}

export default GameScreen;