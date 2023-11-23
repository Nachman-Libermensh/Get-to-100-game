import { useState, useEffect } from "react";

export default function Player(props) {
      let [isChecked, setIsChecked] = useState(false);
      let [style, setStyle] = useState({ background: '#0000ff1f' })
      useEffect(() => {
            if (isChecked) {
                  setStyle({ background: '#B2FFE5', border: '3px dashed #0DD0D3' })
            } else {
                  setStyle({ background: '#D9FFF2' })
            }
      }, [isChecked])

      const onPlayerChecked = () => {
            if (!isChecked) {
                  props.updatePlayersInGame(props.player)
                  setIsChecked(true);
            } else {
                  setIsChecked(false);
                  props.removePlayersInGame(props.player)
            }
      }
      return (
            <div className={props.className} style={style} onClick={onPlayerChecked} >
                  <h2>{props.player.name}</h2>
                  <br />
                  <h5>מס' נצחונות: {props.player.victories}</h5>
            </div >
      )
}