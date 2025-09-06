import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getChatHistory } from '@/lib/supabaseChat';
import { Button } from '@/components/ui/button';

const MyChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const chatsPerPage = 10;

  const fetchChats = async (page = 1) => {
    setLoading(true);
    const result = await getChatHistory({ page, limit: chatsPerPage });
    
    if (result.error) {
      console.error('Error fetching chats:', result.error);
    } else {
      setChats(result.data || []);
      setTotalCount(result.count || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChats(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / chatsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your chat history...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass glass-hover p-6 m-4 rounded-2xl text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-2">
          <MessageSquare className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Chat History
          </h1>
        </div>
        <p className="text-muted-foreground">
          {totalCount > 0 
            ? `${totalCount} conversation${totalCount !== 1 ? 's' : ''} with your AI travel companion`
            : 'No conversations yet'
          }
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {chats.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass glass-hover p-8 rounded-2xl text-center"
          >
            <Bot className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground mb-4">
              Start chatting with your AI travel companion to see your history here!
            </p>
          </motion.div>
        ) : (
          <>
            {/* Chat Cards */}
            <div className="space-y-4 mb-8">
              {chats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass glass-hover p-6 rounded-2xl"
                >
                  {/* Question */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">You asked:</p>
                      <p className="text-muted-foreground bg-gradient-to-r from-secondary/10 to-primary/10 p-3 rounded-xl">
                        {chat.question}
                      </p>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent glow-primary flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">AI replied:</p>
                      <p className="text-muted-foreground bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-xl">
                        {chat.answer}
                      </p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="text-xs text-muted-foreground text-right">
                    {formatDate(chat.created_at)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass glass-hover p-4 rounded-2xl flex items-center justify-between"
              >
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyChats;