import { FormEvent, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../../styled-components/button-standard/button.component";
import "./text-reader.css";

const synth = window.speechSynthesis;

const TextReader = () => {
  const [textValue, setTextValue] = useState<string>("");

  if (!synth) {
    return <span>Your browser does not support Speech Synthesis!</span>;
  }

  return (
    <div className="text-reader">
      <form onSubmit={(e) => {speak(e, textValue)}}>
        <div className="input-dropdown">
          <textarea placeholder="Enter your text:" value={textValue} onChange={e => setTextValue(e.target.value)}/>
        </div>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Speak</Button>
      </form>
    </div>
  )
}


export const speak = (e: FormEvent<HTMLFormElement> | null, textValue: string) => {
  e && e.preventDefault();

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(textValue);
  utterance.voice = synth.getVoices()[0];    
  synth.speak(utterance);
}


export default TextReader;