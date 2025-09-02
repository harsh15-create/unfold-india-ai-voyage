import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Navigation as NavigationIcon, Languages } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const features = [
    {
      icon: Languages,
      title: 'Translator',
      description: 'Translate text to multiple Indian languages instantly',
      path: '/translator',
      gradient: 'from-primary to-accent'
    },
    {
      icon: NavigationIcon,
      title: 'Safe Directions',
      description: 'AI-powered route planning with safety recommendations',
      path: '/routes',
      gradient: 'from-secondary to-primary'
    },
    {
      icon: MessageCircle,
      title: 'AI Chatbot',
      description: 'Your intelligent travel companion for India',
      path: '/chatbot',
      gradient: 'from-accent to-secondary'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      {/* Hero Background */}
      <div className="absolute inset-0 hero-gradient opacity-20" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-6xl mx-auto"
      >
        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Unfold India
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Travel Smart. Travel Safe. Travel with AI.
        </motion.p>

        {/* Feature Buttons */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <Link key={feature.path} to={feature.path}>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="group relative glass glass-hover rounded-2xl p-8 text-center overflow-hidden"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} animate-glow-pulse`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground group-hover:text-white/80 transition-colors text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Border Glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient} p-[2px]`}>
                  <div className="w-full h-full rounded-2xl bg-background/90" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl"
        />
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-secondary/20 to-transparent rounded-full blur-xl"
        />
      </motion.div>
    </div>
  );
};

export default Home;