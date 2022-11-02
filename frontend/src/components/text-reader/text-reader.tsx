import { FormEvent, useState } from "react";
import VoiceSelector from "./voice-selector";
import "./text-reader.css";

const synth = window.speechSynthesis;

const TextReader = () => {
  const [textValue, setTextValue] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<number>(0);

  if (!synth) {
    return <span>Your browser does not support Speech Synthesis!</span>;
  }

  const speak = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textValue);
    utterance.voice = synth.getVoices()[selectedVoice];

    synth.speak(utterance);
  }

  return (
    <div className="text-reader">
      <form onSubmit={speak}>
        Enter text: <input type="text" value={textValue} onChange={e => setTextValue(e.target.value)}/>
        <VoiceSelector selected={selectedVoice} setSelected={setSelectedVoice}/>
        <button type="submit">Speak!</button>
      </form>
    </div>
  )
}

export default TextReader;