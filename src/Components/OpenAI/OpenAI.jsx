import React, { useState } from "react";
import axios from "axios";

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const OpenAIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //   const completion = await openai.chat.completions.create({
      //     model: "gpt-4o-mini-2024-07-18",
      //     messages: [{ role: "user", content: prompt }],
      //   });
      setResponse("test");
    } catch (err) {
      console.error(err);
      setError("Error fetching data from OpenAI.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Ask OpenAI a question</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h3>Response from OpenAI:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAIChat;
