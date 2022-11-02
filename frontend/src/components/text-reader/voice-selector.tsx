import { useCallback, useEffect, useState } from "react"
import { VoiceSelectorProps } from "../../types/types";
import "./voice-selector.css";

const synth = window.speechSynthesis;

const VoiceSelector = ({selected = 0, setSelected }: VoiceSelectorProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const populateVoiceList = useCallback(() => {
    const newVoices = filterVoices();
    setVoices(newVoices);
  }, []);

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList])

  return (
    <div className="voice-selector">
      <select value={selected} onChange={(e) => setSelected(parseInt(e.target.value))}>
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {voice.name} ({voice.lang}) {voice.default && ' [Default]'}
          </option>
        ))}
      </select>
    </div>
  )
}

function filterVoices() {
  return synth.getVoices().filter((voice) => (
    voice.name === "Alex" || voice.name === "Daniel" || voice.name === "Fiona" || 
    voice.name === "Karen" || voice.name === "Mei-Jia" || voice.name === "Rishi" || 
    voice.name === "Samantha"  || voice.name === "Tessa" || voice.name === "Ting-Ting" || 
    voice.name === "Victoria" || voice.name === "Yuri" || voice.name === "Google US English" ||
    voice.name === "Google UK English Male" || voice.name === "Google español de Estados Unidos" ||
    voice.name === "Google Nederlands"
  ))
}


export default VoiceSelector;