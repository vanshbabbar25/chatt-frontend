import React, { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect, useRef } from "react";
const MessageInput = () => {
  const [drafts, setDrafts] = useState({});
  const [showEmoji, setShowEmoji] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { loading, sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const emojis = ["😀", "😂", "😍", "😎", "😭", "🔥", "👍", "❤️"];

  // current message (per user)
  const message = drafts[selectedConversation?._id] || "";

  // -------------------------
  // HANDLE INPUT CHANGE
  // -------------------------
  const handleChange = (value) => {
    if (!selectedConversation?._id) return;

    setDrafts((prev) => ({
      ...prev,
      [selectedConversation._id]: value,
    }));

    // typing event
    if (socket) {
      socket.emit("typing", {
        receiverId: selectedConversation._id,
      });
    }

    // stop typing after delay
     clearTimeout(typingTimeoutRef.current);

   typingTimeoutRef.current = setTimeout(() => {
    if (socket && selectedConversation?._id) {
      socket.emit("stopTyping", {
        receiverId: selectedConversation._id,
      });
    }
    }, 800);
  };

  // -------------------------
  // SEND MESSAGE
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || loading) return;

    await sendMessage(trimmedMessage);

    // clear only current chat draft
    setDrafts((prev) => ({
      ...prev,
      [selectedConversation._id]: "",
    }));
  };

  // -------------------------
  // EMOJI
  // -------------------------
  const handleEmojiClick = (emoji) => {
    handleChange(message + emoji);
    setShowEmoji(false);
  };

  return (
    <form className="px-4 py-3 bg-black/30" onSubmit={handleSubmit}>
      <div className="relative flex items-center gap-2 mt-4 mb-2 px-4 py-2 bg-black/90 backdrop-blur rounded-2xl shadow-md">

        {/* emoji button */}
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-white hover:text-yellow-400"
        >
          <FaSmile />
        </button>

        {/* emoji picker */}
        {showEmoji && (
          <div className="absolute bottom-12 left-2 bg-black p-2 rounded-lg flex gap-2">
            {emojis.map((e, i) => (
              <span
                key={i}
                onClick={() => handleEmojiClick(e)}
                className="cursor-pointer text-lg"
              >
                {e}
              </span>
            ))}
          </div>
        )}

        {/* input */}
        <textarea
          rows="1"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white resize-none max-h-24"
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        {/* send */}
        <button
          disabled={loading || !message.trim()}
          className="text-white hover:text-green-400 disabled:opacity-50"
        >
          {loading ? "..." : <FaPaperPlane />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;