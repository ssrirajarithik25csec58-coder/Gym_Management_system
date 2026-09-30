'use client';

import React, { useState, useRef, useEffect } from 'react';
import { chatbotResponses, type ChatMessage } from '@/lib/mockData';

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-0',
    text: 'Namaste Anita! 🙏 I\'m JAGO, your scholarship assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date().toISOString(),
  },
];

const quickActions = [
  { label: '🎓 Check Eligibility', key: 'eligibility' },
  { label: '📋 Application Status', key: 'status' },
  { label: '📄 Pending Documents', key: 'documents' },
  { label: '💰 Payment Status', key: 'payment' },
];

export default function JagoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const key = messageText.toLowerCase();
      let response = chatbotResponses['default'];

      if (key.includes('eligib') || key.includes('qualify')) {
        response = chatbotResponses['eligibility'];
      } else if (key.includes('status') || key.includes('application') || key.includes('track')) {
        response = chatbotResponses['status'];
      } else if (key.includes('document') || key.includes('upload') || key.includes('pending')) {
        response = chatbotResponses['documents'];
      } else if (key.includes('payment') || key.includes('disburse') || key.includes('money') || key.includes('amount')) {
        response = chatbotResponses['payment'];
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">🤖</div>
            <div className="chatbot-header-info">
              <h4>JAGO Assistant</h4>
              <span>Vidvan Scholarship Helpdesk</span>
            </div>
            <button
              className="chatbot-header-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-actions">
            {quickActions.map((action) => (
              <button
                key={action.key}
                className="chatbot-quick-btn"
                onClick={() => handleSend(action.label.replace(/^[^\s]+\s/, ''))}
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              className="chatbot-input"
              type="text"
              placeholder="Ask JAGO anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="chatbot-send"
              onClick={() => handleSend()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open JAGO chatbot"
      >
        <span className="chatbot-fab-pulse" />
        {isOpen ? '✕' : '🤖'}
      </button>
    </>
  );
}
