import { FormEvent, useState } from "react";
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
        <button type="submit">Speak!</button>
      </form>
    </div>
  )
}


export const speak = (e: FormEvent<HTMLFormElement>, textValue: string) => {
  e.preventDefault();

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(textValue);
  utterance.voice = synth.getVoices()[0];    
  synth.speak(utterance);
}


export default TextReader;