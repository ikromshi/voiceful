import { speak } from "../text-reader/text-reader";
import "./button.css";
import { ReactComponent as Pencil } from "../../assets/trash.svg";
import { ReactComponent as Volume } from "../../assets/volume2.svg";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

const Button = ({button}: {button: any} ) => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="button">
      <div onClick={() => speak(null, button.name)} className="button-speak">
        <Volume />
      </div>
      <div className="button-name">{button.name.toUpperCase()}</div>
      <div className="button-edit">
        {currentUser && <Pencil />}
      </div>
    </div>
  )
}

export default Button;