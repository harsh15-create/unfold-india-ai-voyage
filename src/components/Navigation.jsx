import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, User, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState({ avatar_url: '', full_name: '' });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url, full_name')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chatbot', path: '/chatbot' },
    { name: 'Routes', path: '/routes' },
    { name: 'Translator', path: '/translator' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl"
    >
      <div className="absolute inset-0 backdrop-blur-[25px] bg-white/25 border border-white/30 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]"></div>
      <div className="flex items-center justify-between relative z-10 py-4 pl-6 pr-6">
        {/* Logo */}
        <div className="flex-shrink-0" style={{ width: '180px' }}>
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Unfold India 🌏
            </motion.div>
          </Link>
        </div>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative group"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </motion.span>
              
              {/* Active indicator */}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center justify-end flex-shrink-0" style={{ width: '180px' }}>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-11 w-11 rounded-full backdrop-blur-[20px] bg-white/20 hover:bg-white/30 transition-all duration-300 p-0 flex items-center justify-center"
              >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile.avatar_url} alt={profile.full_name || user.email} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-sm font-semibold">
                      {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 backdrop-blur-xl bg-background/95 border-white/10 shadow-2xl rounded-2xl z-50" 
                align="end" 
                forceMount
                sideOffset={8}
              >
                <div className="flex items-center gap-3 p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profile.avatar_url} alt={profile.full_name || user.email} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-semibold">
                      {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none min-w-0 flex-1">
                    {profile.full_name && (
                      <p className="font-semibold text-sm text-foreground truncate">{profile.full_name}</p>
                    )}
                    <p className="text-xs text-muted-foreground truncate max-w-full">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => navigate('/my-profile')}
                  className="cursor-pointer hover:bg-primary/10 transition-colors m-1 rounded-lg flex items-center py-3 px-3"
                >
                  <User className="mr-3 h-4 w-4" />
                  <span className="font-medium">My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/my-chats')}
                  className="cursor-pointer hover:bg-primary/10 transition-colors m-1 rounded-lg flex items-center py-3 px-3"
                >
                  <MessageSquare className="mr-3 h-4 w-4" />
                  <span className="font-medium">My Chats</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={signOut}
                  className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors m-1 rounded-lg flex items-center py-3 px-3"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="backdrop-blur-[20px] bg-white/20 hover:bg-white/30 text-muted-foreground hover:text-foreground transition-all duration-300"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="glass glass-hover p-2 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;