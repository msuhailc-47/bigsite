import { useState } from 'react';
import { MessageSquare, X, Send, Minimize2 } from 'lucide-react';
import './ChatAssistant.css';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I am Dorek Assistant. How can I help you today?', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Thank you for your message. A representative will get back to you shortly.', isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button className="chat-fab" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
        </button>
      )}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">D</div>
              <div>
                <h4>Dorek Assistant</h4>
                <span>Online</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.isBot ? 'bot' : 'user'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={handleSend}>
            <input type="text" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} />
            <button type="submit"><Send size={18} /></button>
          </form>
        </div>
      )}
    </>
  );
}
