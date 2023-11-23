import { useState } from "react";
import Player from "./Player"
import classes from "./PlayersRegistration.module.css"
import plus from "../assets/images/btnplus.png"
function PlayersRegistration(props) {

      const goToGame = () => {
            if (props.playersInGame.length === 4) {
                  props.startGame(props.playersInGame)
            } else {
                  alert("עליך לבחור 4 שחקנים")
            }
      }
      return (
            <div className={classes.PlayersRegistration} >
                  <h1 className={classes.header}>בחר 4 שחקנים שברצונך לשתף במשחק</h1>
                  <div className={classes.button} onClick={goToGame}><span>היכנס למשחק</span></div>
                  {props.players.map((player) => <Player player={player} className={classes.player} playersInGame={props.playersInGame} updatePlayersInGame={props.updatePlayersInGame} removePlayersInGame={props.removePlayersInGame} />)}
                  <button className={classes.addPlayer} onClick={props.addPlayer}>
                        <img src={plus} />
                  </button>
            </ div>
      )
}

export default PlayersRegistration;