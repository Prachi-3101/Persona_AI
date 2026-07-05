import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import PersonaSelector from "../components/PersonaSelector";

function ChatPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState("Hitesh");
  const [chatHistory, setChatHistory] = useState({ Hitesh: [], Piyush: [] });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const messages = chatHistory[selectedPersona];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const [hiteshData, piyushData] = await Promise.all([
          api.get("/chat/Hitesh"),
          api.get("/chat/Piyush"),
        ]);
        setChatHistory({
          Hitesh: hiteshData.messages || [],
          Piyush: piyushData.messages || [],
        });
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setChatHistory((prev) => ({
      ...prev,
      [selectedPersona]: updatedMessages,
    }));

    setInput("");
    setLoading(true);

    try {
      const data = await api.post("/chat", {
        persona: selectedPersona,
        messages: updatedMessages,
      });

      setChatHistory((prev) => ({
        ...prev,
        [selectedPersona]: [
          ...prev[selectedPersona],
          { role: "assistant", content: data.reply },
        ],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    setMenuOpen(false);
    if (!window.confirm(`Clear all messages with ${selectedPersona}?`)) return;
    try {
      await api.delete(`/chat/${selectedPersona}`);
      setChatHistory((prev) => ({ ...prev, [selectedPersona]: [] }));
    } catch (error) {
      console.error("Failed to clear chat:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  if (initialLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading your chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed md:relative z-40 h-full w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=6366f1&color=fff&size=80`}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-1">
            Personas
          </p>
          <PersonaSelector
            selectedPersona={selectedPersona}
            setSelectedPersona={(p) => {
              setSelectedPersona(p);
              closeSidebar();
            }}
          />
        </div>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 shrink-0 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1 -ml-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

          <img
            src={
              selectedPersona === "Hitesh"
                ? "/assets/hitesh_sir.jpg"
                : "/assets/pitush_sir.jpeg"
            }
            alt={selectedPersona}
            className="w-10 h-10 rounded-full shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{selectedPersona}</h2>
            <p className="text-xs text-gray-400">AI Assistant</p>
          </div>

          <div ref={menuRef} className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                <button
                  onClick={handleClearChat}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  Clear chat
                </button>
              </div>
            )}
          </div>
        </div>

        <ChatBox messages={messages} loading={loading} persona={selectedPersona} />

        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          loading={loading}
          persona={selectedPersona}
        />
      </div>
    </div>
  );
}

export default ChatPage;
