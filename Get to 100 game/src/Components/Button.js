export default function Button(props) {
      return (
            <div className={props.classes.button} onClick={props.function}>
                  {props.value}
            </div>
      )
}