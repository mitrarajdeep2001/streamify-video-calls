import { useState } from "react";
import { setAiPrompt } from "../lib/api";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

const LearnWithAI = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const data = await setAiPrompt({ prompt });
      setResponse(data.result || "No response.");
    } catch (err) {
      setResponse("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div className="min-h-screen p-4 bg-base-100 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl space-y-6 mt-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Learn With AI
          </h1>
          <p className="text-base-content mt-2">
            Ask questions to learn new languages with the help of AI!
          </p>
        </div>

        <div className="form-control w-full">
          <textarea
            className="textarea textarea-bordered w-full min-h-[120px]"
            placeholder="Type your language learning question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3">
          {response && (
            <button
              onClick={handleClear}
              className="btn btn-error"
              disabled={loading}
            >
              Clear Context
            </button>
          )}
          {!response && (
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Generating...
                </>
              ) : (
                "Ask AI"
              )}
            </button>
          )}
        </div>

        {response && (
          <div className="mockup-code whitespace-pre-wrap bg-base-200 text-base-content p-5">
            <button
              className="btn btn-sm btn-ghost absolute top-3 right-3 tooltip tooltip-left"
              data-tip="Copy to clipboard"
              onClick={() => {
                navigator.clipboard.writeText(response);
                toast.success("Copied to clipboard!");
              }}
            >
              <CopyIcon />
            </button>
            <pre>
              <code>{response}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnWithAI;
