import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';

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
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(message),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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

                {/* Message Bubble */}
                <div className={`glass glass-hover p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-secondary/20 to-primary/20' 
                    : 'bg-gradient-to-r from-primary/20 to-accent/20'
                }`}>
                  <p className="text-foreground">{msg.text}</p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3 max-w-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent glow-primary flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="glass glass-hover p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isTyping || !message.trim()}
              className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
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