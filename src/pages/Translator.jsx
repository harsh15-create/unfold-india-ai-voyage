import { motion } from 'framer-motion';
import { useState } from 'react';
import { Languages, Volume2, Copy, RotateCcw } from 'lucide-react';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const languages = [
    { code: 'hindi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    
    // Simulate translation
    setTimeout(() => {
      const translations = {
        hindi: 'नमस्ते! आपका भारत में स्वागत है। यहाँ की संस्कृति और व्यंजन अद्भुत हैं।',
        tamil: 'வணக்கம்! இந்தியாவிற்கு உங்களை வரவேற்கிறோம். இங்கே கலாச்சாரம் மற்றும் உணவு அற்புதமானது.',
        bengali: 'নমস্কার! ভারতে আপনাকে স্বাগতম। এখানকার সংস্কৃতি এবং খাবার অসাধারণ।',
        telugu: 'నమస్కారం! భారతదేశానికి మిమ్మల్ని స్వాగతం. ఇక్కడ సంస్కృతి మరియు వంటకాలు అద్భుతమైనవి.',
        marathi: 'नमस्कार! भारतात तुमचे स्वागत आहे. इथली संस्कृती आणि पदार्थ उत्कृष्ट आहेत.',
        gujarati: 'નમસ્તે! ભારતમાં તમારું સ્વાગત છે. અહીંની સંસ્કૃતિ અને ખોરાક અદ્ભુત છે.'
      };
      
      setOutputText(translations[selectedLanguage] || 'Translation will appear here...');
      setIsTranslating(false);
    }, 1500);
  };

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleSwapLanguages = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Language Translator
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">Break language barriers while exploring India</p>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass glass-hover p-6 rounded-2xl mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Languages className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Select Target Language</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg glow-primary'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <div className="font-medium text-sm">{lang.name}</div>
                <div className="text-xs opacity-80 mt-1">{lang.native}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Translation Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass glass-hover rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">English</h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSwapLanguages}
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-48 p-4 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
              className="w-full mt-4 bg-gradient-to-r from-primary to-secondary p-3 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {isTranslating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Translating...</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-5 h-5" />
                    <span>Translate</span>
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass glass-hover rounded-2xl p-6 relative overflow-hidden"
          >
            {outputText && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-2xl" />
            )}
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-lg font-semibold text-foreground">
                {languages.find(l => l.code === selectedLanguage)?.name || 'Target Language'}
              </h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyText}
                  disabled={!outputText}
                  className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="w-full h-48 p-4 bg-input border border-border rounded-xl text-foreground relative z-10 overflow-y-auto">
              {outputText || (
                <span className="text-muted-foreground">Translation will appear here...</span>
              )}
            </div>
            
            {outputText && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className="w-full mt-4 bg-gradient-to-r from-secondary to-primary p-3 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isPlaying ? (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="flex space-x-1"
                      >
                        <div className="w-1 h-4 bg-white rounded-full" />
                        <div className="w-1 h-6 bg-white rounded-full" />
                        <div className="w-1 h-4 bg-white rounded-full" />
                        <div className="w-1 h-6 bg-white rounded-full" />
                        <div className="w-1 h-4 bg-white rounded-full" />
                      </motion.div>
                      <span>Playing...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5" />
                      <span>Play Audio</span>
                    </>
                  )}
                </span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Translator;