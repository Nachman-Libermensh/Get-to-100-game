import { useEffect, useState } from "react";
import Button from "./Button"



function PlayerScreen(props) {
      let [number, setNumber] = useState(props.player.number);
      let [steps, setSteps] = useState(props.player.steps);

      useEffect(() => {
            if (number === 100) {
                  console.log(props.player)
                  props.updatePlayerVictories(props.player.playerID, steps);
                  // alert("המשחק הסתיים!" + "\n" + " המנצח הינו: " + props.player.name + "\n" + "👏👏👏👏👏👏" + "\n כעת תועבר למסך ההתחלה")
                  // props.goBack()
            } else {
                  props.setQueue();
            }
      }, [steps])


      const options = [
            { value: "+", function: () => { setNumber(number + 1); setSteps(steps + 1) } },
            { value: "-", function: () => { setNumber(number - 1); setSteps(steps + 1) } },
            { value: "×", function: () => { setNumber(Math.floor(number * 2)); setSteps(steps + 1) } },
            { value: "÷", function: () => { setNumber(Math.floor(number / 2)); setSteps(steps + 1) } }
      ]

      const exitOptions = [
            { value: "צא", function: () => { toExit() } },
            { value: "משחק חדש", function: () => { newGame() } }
      ]

      const toExit = () => {
            // props.removePlayersFromGame(props.player);
            // for (let i = 0; i < props.playersInGame.length; i++) {
            //       if (props.playersInGame[i].playerID === props.player.playerID) {
            //             delete props.playersInGame[i];
            //             props.playersInGame.sort((a, b) => { return a.id - b.id });
            //             props.playersInGame.pop();
            //             props.setPlayersInGame([...props.playersInGame])
            //       }
            // }
            // for (let i = 0; i < props.playersInGame.length; i++) {
            //       props.playersInGame[i].id = i + 1;
            // }
            // props.setPlayersInGame([...props.playersInGame])
            // props.setQueue(0);
            props.goBack();
      }
      const newGame = () => {
            setNumber(Math.floor((Math.random() * 100)))
            props.player.number = number
            setSteps(0)//מוגדר ל-1 בגלל שמוגדר שבכל שינוי של המספר (המוגרל) יעדכן גם את מס' השלבים, לכן כעת יאופס ל0!
            props.player.steps = steps
      }

      return (
            <div className={props.className}>
                  <h2>{props.player.name}</h2>
                  <h4>המספר שלך: {number}</h4>
                  <h4>מס' הצעדים עד כה: {steps}</h4>
                  <div className={props.classes.options}>
                        {props.queue === props.player.id && number !== 100 ? options.map((element) => <Button value={element.value} function={element.function} classes={props.classes} />) : ""}
                        {number === 100 ? <h2 >ניצחת!!</h2> : ""}
                        {number === 100 ? exitOptions.map((item) => <Button value={item.value} function={item.function} classes={props.classes} type={"endGame"} />) : ""}
                  </div>

            </div>
      )
}
export default PlayerScreen;