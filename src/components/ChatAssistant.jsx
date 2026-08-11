import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import './ChatAssistant.css';
import { findBestResponse } from './chatKnowledge';

export default function ChatAssistant({ lang, t }) {
    const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: t.chat.greeting, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const bodyRef = useRef(null);

  // Update greeting when language changes
  useEffect(() => {
    const greeting = t.chat.greeting;
    setMessages(prev => prev.map((m, i) => (i === 0 ? { ...m, text: greeting } : m)));
  }, [t.chat.greeting]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Hide pulse notification after opening
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const getBotResponse = (userMessage) => {
    return findBestResponse(userMessage);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    // Simulate a small thinking delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, delay);
  };

  const handleChipClick = (chip) => {
    setMessages(prev => [...prev, { text: chip, isBot: false }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(chip);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 800);
  };

  // Simple markdown-like renderer for bold text
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const quickChips = t.chat.options || [
    'Products & Services',
    'Business Opportunities',
    'Franchise Info',
    'Contact Sales'
  ];

  return (
    <>
      {!isOpen && (
        <button className="chat-fab" onClick={() => setIsOpen(true)} aria-label="Open Chat">
          <MessageSquare size={24} />
          {showPulse && <span className="chat-fab-pulse" />}
        </button>
      )}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4>{t.chat.title}</h4>
                <span className="chat-online-status">
                  <span className="chat-online-dot" />
                  {t.chat.online}
                </span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.isBot ? 'bot' : 'user'}`}>
                {m.isBot && (
                  <div className="chat-bubble-icon">
                    <Sparkles size={12} />
                  </div>
                )}
                <div className="chat-bubble-text">
                  {m.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {renderText(line)}
                      {j < m.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-bubble bot typing-bubble">
                <div className="chat-bubble-icon">
                  <Sparkles size={12} />
                </div>
                <div className="typing-indicator">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {/* Quick Reply Chips — show after first bot message if no user messages yet */}
            {messages.length <= 1 && !isTyping && (
              <div className="chat-chips">
                {quickChips.map((chip, i) => (
                  <button key={i} className="chat-chip" onClick={() => handleChipClick(chip)}>
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder={t.chat.placeholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !input.trim()} aria-label="Send Message">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
