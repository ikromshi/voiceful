import "./button.css";

const Button = ({buttons}: {buttons: any}) => {
  console.log(buttons);
  return (
    <div className="button">
      {buttons.map((button: any, idx: any) => {
        return <button key={idx}>{button.name}</button>
      })}
    </div>
  )
}

export default Button;
/**
 return folder.buttons.map((button: any, idx: number) => <button key={button.id}>{button.name}</button>);

 */