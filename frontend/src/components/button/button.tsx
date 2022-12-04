import { speak } from "../text-reader/text-reader";
import "./button.css";
import { ReactComponent as Pencil } from "../../assets/pencil.svg";
import { ReactComponent as Volume } from "../../assets/volume.svg";

const Button = ({button}: {button: any} ) => {
  
  return (
    <div className="button">
      <div onClick={() => speak(null, button.name)} className="button-speak">
        <Volume />
      </div>
      <div className="button-name">{button.name.toUpperCase()}</div>
      <div className="button-edit">
        <Pencil />
      </div>
    </div>
  )
}

export default Button;