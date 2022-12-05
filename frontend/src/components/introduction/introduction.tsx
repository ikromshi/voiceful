import { useEffect, useState } from "react";
import "./introduction.css";

const Introduction = () => {
  const [loopNum] = useState(0);
  const [isDeleting] = useState(false);
  const wordsToRotate = ["Speak your mind by entering your thoughts into the text box and pressing the “Speak” button for it to be read aloud or use our automatically generated buttons to read out text. You can also sign up to create your own personalized buttons."];
  const [text, setText] = useState("");
  const [delta] = useState(20)

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker)};
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % wordsToRotate.length;
    let fullText = wordsToRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length-1) : fullText.substring(0, text.length+1);
    setText(updatedText);
    if (updatedText === text) {
      return;
    }
  }

  return (
    <div className="introduction">
      <h1>Welcome to Voiceful</h1>
      <h2>Here, we will help you discover your true voice</h2>
      <h3><span className="wrap">{text}</span></h3>
    </div>
  )
}

export default Introduction;