import "./button.css";

const Button = ({buttons}: {buttons: any}) => {
  
  return (
    <div className="button">
      {buttons.map((button: any, idx: any) => {
        return <button key={idx}>{button.name}</button>
      })}
    </div>
  )
}

export default Button;