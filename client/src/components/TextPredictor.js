import React, { useState, useEffect } from "react";
import { Input } from "antd";
import axios from "axios";

function TextPredictor() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);

  async function fetchText() {
    const response = await axios
      .post("http://localhost:5000/predictor", {
        text: text
      })
      .catch(e => {
        console.log("Error", e);
      });

    setOptions(response.data.slice(0, 3));
  }

  useEffect(() => {
    fetchText();
  }, [text]);

  return (
    <div>
      <h3>Text Predictor</h3>
      <Input onChange={e => setText(e.target.value)} style={{ width: "30%" }} />
      <h5>Possible text options</h5>
      <ul>
        {options &&
          options.map((option, index) => <li key={index}>{option}</li>)}
      </ul>
    </div>
  );
}

export default TextPredictor;
