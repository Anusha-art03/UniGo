
import { useState } from "react";
import "./AIAgent.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AIAgentProps = {
  onHome: () => void;
  onMarketplace: () => void;
  onLostFound: () => void;
  onCommunity: () => void;
  onEvents: () => void;
  onLogin: () => void;
};

function AIAgent({
  onHome,
  onMarketplace,
  onLostFound,
  onCommunity,
  onEvents,
  onLogin,
}: AIAgentProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage: Message = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to UniGo AI right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const quickPrompts = [
    "Explain this topic to me",
    "Help me with a coding project",
    "Make me a study plan",
    "Help me prepare for an interview",
  ];

  return (
    <div className="ai-page">

      {/* NAVBAR */}
      <nav className="ai-navbar">

        <button className="ai-logo" onClick={onHome}>
          UniGo
        </button>

        <div className="ai-nav-links">

          <button onClick={onHome}>Home</button>

          <button onClick={onMarketplace}>
            Marketplace
          </button>

          <button onClick={onLostFound}>
            Lost & Found
          </button>

          <button onClick={onCommunity}>
            Community
          </button>

          <button onClick={onEvents}>
            Events
          </button>

          <button className="ai-active">
            AI Agent
          </button>

        </div>

        <button className="ai-login-btn" onClick={onLogin}>
          Login
        </button>

      </nav>

      {/* MAIN */}
      <main className="ai-main">

        <div className="ai-header">

          <div className="ai-badge">
            ✦ UNIGO AI
          </div>

          <h1>
            Your student
            <br />
            <span>AI companion.</span>
          </h1>

          <p>
            Ask questions, understand difficult topics, get coding help,
            plan your studies, and more.
          </p>

        </div>

        {/* CHAT */}
        <div className="ai-chat-container">

          {messages.length === 0 ? (

            <div className="ai-empty">

              <div className="ai-icon">
                ✦
              </div>

              <h2>
                How can I help you?
              </h2>

              <p>
                Ask UniGo AI anything about studying,
                coding, projects, careers, or student life.
              </p>

              <div className="quick-prompts">

                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}

              </div>

            </div>

          ) : (

            <div className="ai-messages">

              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`ai-message ${
                    item.role === "user"
                      ? "ai-user-message"
                      : "ai-assistant-message"
                  }`}
                >
                  <div className="message-label">
                    {item.role === "user"
                      ? "You"
                      : "UniGo AI"}
                  </div>

                  <div className="message-content">
                    {item.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="ai-message ai-assistant-message">
                  <div className="message-label">
                    UniGo AI
                  </div>

                  <div className="typing">
                    Thinking...
                  </div>
                </div>
              )}

            </div>

          )}

          {/* INPUT */}
          <div className="ai-input-area">

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask UniGo AI anything..."
              rows={1}
            />

            <button
              className="ai-send-btn"
              onClick={sendMessage}
              disabled={!message.trim() || loading}
            >
              →
            </button>

          </div>

          <p className="ai-disclaimer">
            UniGo AI can make mistakes. Verify important information.
          </p>

        </div>

      </main>

    </div>
  );
}

export default AIAgent;