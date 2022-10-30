import { useCallback, useEffect, useState } from "react"
import { VoiceSelectorProps } from "../../types/types";

const synth = window.speechSynthesis;

const VoiceSelector = ({selected = 0, setSelected }: VoiceSelectorProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices();
    setVoices(newVoices);
  }, []);

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList])

  return (
    <div>
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

export default VoiceSelector;