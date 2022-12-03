import { speak } from "../text-reader/text-reader";
import "./button.css";

const Button = ({button}: {button: any} ) => {
  
  return (
    <div className="button">
      <div onClick={() => speak(null, button.name)} className="button-speak">S</div>
      <div className="button-name">{button.name.toUpperCase()}</div>
      <div className="button-edit">E</div>
    </div>
  )
}

export default Button;