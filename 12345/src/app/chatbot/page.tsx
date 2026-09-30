'use client';

import { useState, useRef, useEffect } from 'react';
import { chatbotResponses, currentStudent, applications, disbursements, type ChatMessage } from '@/lib/mockData';

const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)' },
  { code: 'gon', name: 'गोंडी (Gondi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
];

export default function ChatbotPage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: `Johar Anita! 🙏 I am JAGO, your dedicated Vidvan Scholarship Assistant.\n\nI have direct access to your verified student records, your active Post-Matric application (APP-2025-PM-0382), and your DigiLocker documents.\n\nHow can I guide you today?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || input.trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let response = chatbotResponses['default'];

      if (q.includes('eligib') || q.includes('qualify') || q.includes('eligible') || q.includes('apply')) {
        response = `Based on your profile as an ST student from Dumka, Jharkhand currently in 2nd year B.Sc. Chemistry:\n\n1. ✅ **Post-Matric Scholarship**: Already sanctioned for ₹42,000 for 2025-26.\n2. ⚠️ **Top Class Scheme**: Currently deficient because your college is not on the notified premier list.\n3. 🎓 **NFST Fellowship**: You will be eligible after completing B.Sc. + M.Sc. and qualifying UGC-NET JRF.\n4. ✈️ **NOS Scheme**: Eligible if you secure admission in a top 500 QS global university with family income under ₹6 Lakh.`;
      } else if (q.includes('status') || q.includes('track') || q.includes('application')) {
        response = `Here is your real-time application status:\n\n📋 **Post-Matric (APP-2025-PM-0382)**\n• Status: **Sanctioned** ✅\n• Progress: 85% Completed\n• Sanctioned: ₹42,000 | Disbursed: ₹28,000\n• Current Stage: Second disbursement undergoing PFMS clearance.\n\n⚠️ **Top Class Education (APP-2025-TC-0089)**\n• Status: **Deficient**\n• Pending action: Updated income certificate required.`;
      } else if (q.includes('document') || q.includes('wallet') || q.includes('deficiency') || q.includes('fix')) {
        response = `Documents status for your profile:\n\n✅ **Aadhaar**: Verified via UIDAI eKYC\n✅ **ST Certificate**: Verified via Jharkhand e-District\n✅ **Marksheet**: Verified via Academic Bank of Credits\n⚠️ **Income Certificate**: Expired (issued March 2024). Please upload a fresh 2025-26 certificate or pull from DigiLocker to clear your Top Class deficiency!`;
      } else if (q.includes('payment') || q.includes('money') || q.includes('dbt') || q.includes('disburs') || q.includes('bank')) {
        response = `Payment summary for Anita Murmu:\n\n• **Received**: ₹28,000 credited to SBI A/c (XXXX-3456) on 10 Sep 2025.\n• **Upcoming**: ₹14,000 (Sem 4 Maintenance) is under PFMS clearance. Expected credit in November 2025.\n• **NPCI Status**: Active. Aadhaar Payment Bridge is mapped and healthy!`;
      }

      if (selectedLang === 'hi') {
        response = `[हिन्दी अनुवाद]: ` + response;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>JAGO AI Scholarship Assistant</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Multilingual, context-aware chatbot directly integrated with NSP, SFMP, and DigiLocker
          </p>
        </div>

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Language:</span>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div
        className="card"
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          height: '680px',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          border: '1.5px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Chat Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
            color: 'white',
            padding: 'var(--space-4) var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
              }}
            >
              🤖
            </div>
            <div>
              <h3 style={{ color: 'white', fontSize: '1.05rem', margin: 0 }}>JAGO Assistant</h3>
              <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                Connected to Student Profile: {currentStudent.name} ({currentStudent.aparId})
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSpeaking(!isSpeaking)}
            className="btn btn-secondary btn-sm"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              fontSize: '0.75rem',
            }}
          >
            {isSpeaking ? '🔊 Audio Assist On' : '🔇 Audio Assist Off'}
          </button>
        </div>

        {/* Message History */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            background: 'var(--bg)',
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-msg ${m.sender}`}
              style={{
                maxWidth: '75%',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                background: m.sender === 'user' ? 'var(--primary)' : 'var(--surface)',
                color: m.sender === 'user' ? 'white' : 'var(--text)',
                boxShadow: 'var(--shadow-sm)',
                border: m.sender === 'bot' ? '1px solid var(--border)' : 'none',
              }}
            >
              {m.text.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < m.text.split('\n').length - 1 && <br />}
                </span>
              ))}
              <div
                style={{
                  fontSize: '0.68rem',
                  opacity: 0.65,
                  marginTop: '4px',
                  textAlign: m.sender === 'user' ? 'right' : 'left',
                }}
              >
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Prompts */}
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'var(--surface)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            gap: 'var(--space-2)',
            overflowX: 'auto',
          }}
        >
          {[
            '🎓 Check My Scheme Eligibility',
            '📋 Status of Post-Matric Application',
            '⚠️ How to fix Top Class deficiency?',
            '💰 When will my next payment come?',
          ].map((prompt, idx) => (
            <button
              key={idx}
              className="chatbot-quick-btn"
              onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ''))}
              style={{ whiteSpace: 'nowrap' }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: 'var(--space-3)',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            placeholder="Type your question or click a prompt above..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{ borderRadius: 'var(--radius-full)' }}
          />
          <button
            className="btn btn-primary"
            onClick={() => handleSendMessage()}
            style={{ borderRadius: 'var(--radius-full)', padding: 'var(--space-3) var(--space-6)' }}
          >
            Send ➤
          </button>
        </div>
      </div>
    </div>
  );
}
