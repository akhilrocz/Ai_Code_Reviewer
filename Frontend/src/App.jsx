import { useState, useEffect } from "react";
import axios from "axios";

import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import Markdown from "react-markdown";

import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

import * as CodeEditorModule from "react-simple-code-editor";
import "./App.css";

const Editor =
  CodeEditorModule.default?.default ??
  CodeEditorModule.default ??
  CodeEditorModule;

export default function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/ai/get-review`, {
      code,
    });

    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(value) => setCode(value)}
              highlight={(value) =>
                prism.highlight(value, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: "#2d2d2d",
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                color: "#f8f8f2",
              }}
            />
            <div onClick={reviewCode} className="review">
              Review
            </div>
          </div>
        </div>

        <div className="right">
          <div className="markdown-wrapper">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </main>
    </>
  );
}
