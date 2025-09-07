import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { saveChat } from '@/lib/supabaseChat';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI travel companion for India. How can I help you plan your journey today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(async () => {
      const aiResponseText = generateAIResponse(message);
      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Save chat to database
      await saveChat(newMessage.text, aiResponseText);
    }, 2000);
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      "That's a great question about traveling in India! Based on your query, I'd recommend exploring the cultural heritage sites and trying the local cuisine.",
      "India offers incredible diversity in destinations. Would you like me to suggest some routes based on your interests?",
      "For safety while traveling, I always recommend staying connected with local guides and keeping emergency contacts handy.",
      "The best time to visit varies by region. Northern India is great in winter, while the south is pleasant year-round.",
      "I can help you with language translations, local customs, and finding the best authentic experiences!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass glass-hover p-6 m-4 rounded-2xl text-center"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AI Travel Companion
        </h1>
        <p className="text-muted-foreground mt-2">Ask me anything about traveling in India!</p>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.02 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.sender === 'ai' 
                    ? 'bg-gradient-to-r from-primary to-accent glow-primary' 
                    : 'bg-gradient-to-r from-secondary to-primary'
                }`}>
                  {msg.sender === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Enhanced Message Bubble */}
                <motion.div 
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: msg.sender === 'user' 
                      ? '0 8px 32px hsla(var(--secondary) / 0.3)' 
                      : '0 8px 32px hsla(var(--primary) / 0.3)'
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`glass p-4 rounded-2xl backdrop-blur-xl border ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-secondary/30 to-primary/20 border-secondary/30' 
                      : 'bg-gradient-to-br from-primary/30 to-accent/20 border-primary/30'
                  } transition-all duration-500 ease-out hover:border-opacity-60`}
                >
                  <p className="text-foreground leading-relaxed">{msg.text}</p>
                  <span className="text-xs text-muted-foreground mt-3 block opacity-70 hover:opacity-100 transition-opacity">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3 max-w-xl">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent glow-primary flex items-center justify-center"
                >
                  <Bot className="w-5 h-5" />
                </motion.div>
                <div className="glass backdrop-blur-xl p-4 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/30">
                  <div className="flex space-x-2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.2, 
                        repeat: Infinity, 
                        delay: 0,
                        ease: "easeInOut"
                      }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.2, 
                        repeat: Infinity, 
                        delay: 0.2,
                        ease: "easeInOut"
                      }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.2, 
                        repeat: Infinity, 
                        delay: 0.4,
                        ease: "easeInOut"
                      }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4"
      >
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="glass glass-hover p-4 rounded-2xl flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me about destinations, safety, culture, or anything about India..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
              disabled={isTyping}
            />
            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -1, 1, 0],
                boxShadow: '0 0 30px hsla(var(--primary) / 0.6)'
              }}
              whileTap={{ 
                scale: 0.9,
                rotate: 0
              }}
              transition={{ 
                duration: 0.3,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              disabled={isTyping || !message.trim()}
              className="bg-gradient-to-r from-primary via-accent to-secondary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed glow-primary transition-all duration-300 hover:shadow-2xl"
            >
              {isTyping ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Chatbot;