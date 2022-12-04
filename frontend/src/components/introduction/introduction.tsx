import { useEffect, useState } from "react";
import "./introduction.css";

const Introduction = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const wordsToRotate = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, nulla dolores, reiciendis voluptatum distinctio aliquid deleniti iusto molestiae similique blanditiis repellat quisquam. Cumque dolorem, reprehenderit maxime asperiores dicta maiores recusandae?"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(20)
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker)};
  }, [text]);

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