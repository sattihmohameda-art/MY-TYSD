import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Search, Home, LayoutGrid, 
  TrendingUp, MessageSquare, User, Pin, PinOff, 
  Pencil, Trash2, X, Mic, Send, Paperclip, MoreVertical,
  Languages
} from 'lucide-react';

interface Message {
  id: string;
  text?: string;
  translatedText?: string;
  language?: string;
  isVoice?: boolean;
  duration?: string;
  sender: 'me' | 'them';
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isFavorite: boolean;
  isBlocked: boolean;
  avatarSeed: string;
}

interface MessagesViewProps {
  onBack: () => void;
  initialFriendName?: string;
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Maria Kowalska',
    lastMessage: 'Ta torba jest niesamowita! Bardzo dziękuję...',
    time: 'Just Now',
    unreadCount: 1,
    isFavorite: false,
    isBlocked: false,
    avatarSeed: 'maria'
  },
  {
    id: '2',
    name: 'Julien Lefebvre',
    lastMessage: 'Sent a photo',
    time: '2h',
    isFavorite: false,
    isBlocked: false,
    avatarSeed: 'julien'
  },
  {
    id: '3',
    name: 'Elara Vance',
    lastMessage: 'See you tomorrow at the workshop!',
    time: '5h',
    isFavorite: false,
    isBlocked: false,
    avatarSeed: 'elara'
  }
];

export const MessagesView: React.FC<MessagesViewProps> = ({ onBack, initialFriendName }) => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);

  useEffect(() => {
    if (initialFriendName) {
      const conv = conversations.find(c => c.name.toLowerCase().includes(initialFriendName.toLowerCase()));
      if (conv) {
        setActiveChat(conv);
      } else {
        // Create a temporary conversation if not found
        const newConv: Conversation = {
          id: `temp-${Date.now()}`,
          name: initialFriendName,
          lastMessage: 'Nouveau message',
          time: 'Maintenant',
          isFavorite: false,
          isBlocked: false,
          avatarSeed: initialFriendName.toLowerCase()
        };
        setConversations(prev => [newConv, ...prev]);
        setActiveChat(newConv);
      }
    }
  }, [initialFriendName]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Salut ! Comment ça va ?', sender: 'them', time: '10:00', language: 'fr' },
    { id: '2', text: 'Ça va super et toi ?', sender: 'me', time: '10:02', language: 'fr' },
    { id: '3', text: 'How is your project going?', translatedText: 'Comment avance ton projet ?', sender: 'them', time: '10:04', language: 'en' },
    { id: '4', isVoice: true, duration: '0:12', sender: 'them', time: '10:05' },
  ]);
  const [inputText, setInputText] = useState('');
  
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  const handleTouchStart = (conv: Conversation) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedConv(conv);
      setIsMenuOpen(true);
    }, 600); // 600ms for long press
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const toggleFavorite = () => {
    if (!selectedConv) return;
    setConversations(prev => prev.map(c => 
      c.id === selectedConv.id ? { ...c, isFavorite: !c.isFavorite } : c
    ));
    setIsMenuOpen(false);
  };

  const toggleBlocked = () => {
    if (!selectedConv) return;
    setConversations(prev => prev.map(c => 
      c.id === selectedConv.id ? { ...c, isBlocked: !c.isBlocked } : c
    ));
    setIsMenuOpen(false);
  };

  const deleteConversation = () => {
    if (!selectedConv) return;
    setConversations(prev => prev.filter(c => c.id !== selectedConv.id));
    setIsMenuOpen(false);
  };

  const startRename = () => {
    if (!selectedConv) return;
    setNewName(selectedConv.name);
    setIsRenaming(true);
  };

  const confirmRename = () => {
    if (!selectedConv || !newName.trim()) return;
    setConversations(prev => prev.map(c => 
      c.id === selectedConv.id ? { ...c, name: newName.trim() } : c
    ));
    if (activeChat?.id === selectedConv.id) {
      setActiveChat(prev => prev ? { ...prev, name: newName.trim() } : null);
    }
    setIsRenaming(false);
    setIsMenuOpen(false);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const handleSendVoice = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      isVoice: true,
      duration: '0:05',
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Sort: Favorites first, then by time (simulated by ID here for simplicity)
  const sortedConversations = [...conversations]
    .filter(c => !c.isBlocked) // Hide blocked for now
    .sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased selection:bg-on-surface selection:text-surface">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-10"
          >
            {/* Top App Bar */}
            <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-2xl border-b border-on-surface/5">
              <div className="relative flex items-center justify-center px-8 py-4 w-full">
                <div className="absolute left-8">
                  <button onClick={onBack} className="hover:opacity-80 transition-opacity cursor-pointer scale-95 active:scale-90">
                    <ArrowLeft size={24} className="text-on-surface" />
                  </button>
                </div>
                <h1 className="text-xl font-black tracking-tighter text-on-surface font-headline">MY TYSD</h1>
              </div>
            </header>

            <main className="pt-24 px-6 max-w-2xl mx-auto min-h-screen">
              {/* Search Bar */}
              <div className="mb-10">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search size={18} className="text-on-surface/40" />
                  </div>
                  <input 
                    className="w-full bg-on-surface/5 border-none rounded-full py-4 pl-14 pr-6 text-on-surface placeholder:text-on-surface/30 focus:ring-1 focus:ring-on-surface/10 transition-all font-body text-sm backdrop-blur-md" 
                    placeholder="Search messages" 
                    type="text"
                  />
                </div>
              </div>

              {/* Stories / Active Now */}
              <div className="mb-12 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {/* Sort stories: Pinned first, then others */}
                {[
                  { name: 'MARIA', seed: 'maria', id: '1' },
                  { name: 'JULIEN', seed: 'julien', id: '2' },
                  { name: 'ELARA', seed: 'elara', id: '3' },
                  { name: 'MARCUS', seed: 'marcus', id: '4' }
                ]
                .sort((a, b) => {
                  const isAPinned = conversations.find(c => c.id === a.id)?.isFavorite;
                  const isBPinned = conversations.find(c => c.id === b.id)?.isFavorite;
                  if (isAPinned && !isBPinned) return -1;
                  if (!isAPinned && isBPinned) return 1;
                  return 0;
                })
                .map((story) => {
                  const isPinned = conversations.find(c => c.id === story.id)?.isFavorite;
                  return (
                    <div 
                      key={story.name} 
                      onClick={() => {
                        const conv = conversations.find(c => c.id === story.id);
                        if (conv) setActiveChat(conv);
                      }}
                      className={`flex-shrink-0 flex flex-col items-center gap-3 transition-opacity cursor-pointer ${!isPinned && story.id !== '1' ? 'opacity-40' : ''}`}
                    >
                      <div className={`relative p-0.5 rounded-full border ${isPinned ? 'border-on-surface' : 'border-on-surface/10'}`}>
                        <img 
                          className="w-16 h-16 rounded-full object-cover" 
                          alt={story.name} 
                          src={`https://picsum.photos/seed/${story.seed}/200/200`}
                          referrerPolicy="no-referrer"
                        />
                        {story.id === '1' && !isPinned && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-surface rounded-full shadow-sm"></div>
                        )}
                        {isPinned && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-on-surface text-surface flex items-center justify-center rounded-full shadow-lg border border-surface">
                            <Pin size={10} fill="currentColor" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${isPinned ? 'text-on-surface' : 'text-on-surface/60'}`}>
                        {story.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Conversations List */}
              <section className="space-y-8">
                {sortedConversations.map((conv) => (
                  <div 
                    key={conv.id}
                    onMouseDown={() => handleTouchStart(conv)}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchEnd}
                    onTouchStart={() => handleTouchStart(conv)}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => {
                      if (!isMenuOpen) setActiveChat(conv);
                    }}
                    className={`flex items-center gap-5 group cursor-pointer transition-opacity ${!conv.unreadCount && !conv.isFavorite ? 'opacity-50 hover:opacity-100' : ''}`}
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        className={`w-14 h-14 rounded-full object-cover border border-on-surface/10 ${!conv.unreadCount && !conv.isFavorite ? 'grayscale' : ''}`} 
                        alt={conv.name} 
                        src={`https://picsum.photos/seed/${conv.avatarSeed}/200/200`}
                        referrerPolicy="no-referrer"
                      />
                      {conv.unreadCount && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-on-surface text-surface flex items-center justify-center rounded-full text-[10px] font-black shadow-lg">
                          {conv.unreadCount}
                        </div>
                      )}
                      {conv.isFavorite && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-on-surface text-surface flex items-center justify-center rounded-full shadow-lg border border-surface">
                          <Pin size={10} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 border-b border-on-surface/5 pb-6">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className={`font-headline tracking-tight ${conv.unreadCount || conv.isFavorite ? 'font-extrabold text-on-surface' : 'font-bold text-on-surface'}`}>
                          {conv.name}
                        </h3>
                        <span className="text-[9px] text-on-surface/40 uppercase tracking-[0.2em] font-bold">{conv.time}</span>
                      </div>
                      <p className={`text-sm truncate font-body ${conv.unreadCount ? 'text-on-surface/80 font-medium' : 'text-on-surface/40'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            </main>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-screen bg-surface"
          >
            {/* Chat Header */}
            <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-2xl border-b border-on-surface/5 px-6 py-4">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setActiveChat(null)}
                    className="p-2 hover:bg-on-surface/5 rounded-full transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={`https://picsum.photos/seed/${activeChat.avatarSeed}/200/200`}
                        className="w-10 h-10 rounded-full object-cover border border-on-surface/5"
                        alt={activeChat.name}
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-surface rounded-full"></div>
                    </div>
                    <div>
                      <h2 className="font-headline font-black text-sm tracking-tight">{activeChat.name}</h2>
                      <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">En ligne</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setSelectedConv(activeChat);
                      setIsMenuOpen(true);
                    }}
                    className="p-2 hover:bg-on-surface/5 rounded-full transition-colors text-on-surface/40"
                  >
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto pt-24 pb-32 px-6 scrollbar-hide">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex justify-center my-8">
                  <span className="bg-on-surface/5 text-on-surface/40 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                    Aujourd'hui
                  </span>
                </div>

                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] space-y-1`}>
                      <div className={`
                        px-5 py-3.5 rounded-[2rem] text-sm font-body shadow-sm
                        ${msg.sender === 'me' 
                          ? 'bg-on-surface text-surface rounded-tr-none' 
                          : 'bg-on-surface/5 text-on-surface rounded-tl-none'}
                      `}>
                        {msg.isVoice ? (
                          <div className="flex items-center gap-3 min-w-[120px]">
                            <div className={`p-2 rounded-full ${msg.sender === 'me' ? 'bg-surface/20' : 'bg-on-surface/10'}`}>
                              <Mic size={16} />
                            </div>
                            <div className="flex-1 h-1 bg-current opacity-20 rounded-full relative overflow-hidden">
                              <div className="absolute inset-0 bg-current opacity-40 animate-pulse"></div>
                            </div>
                            <span className="text-[10px] font-bold opacity-60">{msg.duration}</span>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <p>{msg.text}</p>
                            {msg.language && msg.language !== 'fr' && msg.translatedText && (
                              <div className={`pt-1.5 border-t ${msg.sender === 'me' ? 'border-surface/20' : 'border-on-surface/10'} flex items-start gap-2`}>
                                <Languages size={12} className="mt-0.5 flex-shrink-0 opacity-60" />
                                <p className="italic text-[11px] opacity-80 leading-relaxed">
                                  {msg.translatedText}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className={`text-[9px] font-bold text-on-surface/30 uppercase tracking-widest ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Chat Input Area */}
            <div className="fixed bottom-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-on-surface/5 px-6 py-6">
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                <button className="p-3 bg-on-surface/5 hover:bg-on-surface/10 rounded-full transition-colors text-on-surface/40">
                  <Paperclip size={20} />
                </button>
                <div className="flex-1 relative">
                  <input 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Écrire un message..."
                    className="w-full bg-on-surface/5 border-none rounded-full py-4 px-6 text-sm font-body focus:ring-1 focus:ring-on-surface/10"
                  />
                </div>
                {inputText.trim() ? (
                  <button 
                    onClick={handleSendMessage}
                    className="p-4 bg-on-surface text-surface rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={handleSendVoice}
                    className="p-4 bg-on-surface text-surface rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <Mic size={20} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Long Press Menu Modal (Floating Style) */}
      <AnimatePresence>
        {isMenuOpen && selectedConv && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-6 pb-24 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsMenuOpen(false); setIsRenaming(false); }}
              className="absolute inset-0 bg-on-surface/5 backdrop-blur-[2px] pointer-events-auto"
            />
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-xs pointer-events-auto"
            >
              <div className="flex flex-col gap-2">
                {isRenaming ? (
                  <div className="bg-surface rounded-[1.5rem] p-4 shadow-2xl border border-on-surface/5 space-y-3">
                    <input 
                      autoFocus
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-on-surface/5 border-none rounded-full py-2.5 px-5 text-on-surface placeholder:text-on-surface/40 font-headline font-bold text-xs focus:ring-1 focus:ring-on-surface/10"
                      placeholder="Nouveau nom"
                    />
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsRenaming(false)}
                        className="flex-1 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest bg-on-surface/5 text-on-surface/60 hover:bg-on-surface/10 transition-colors"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={confirmRename}
                        className="flex-1 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest bg-on-surface text-surface shadow-xl hover:bg-on-surface/90 transition-colors"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={toggleFavorite}
                      className="flex items-center justify-between gap-4 bg-surface hover:bg-gray-50 transition-all rounded-full py-2.5 px-6 shadow-xl border border-on-surface/5 group"
                    >
                      <span className="font-headline font-black text-[9px] uppercase tracking-[0.2em] text-on-surface group-active:scale-95 transition-transform">
                        {selectedConv.isFavorite ? 'Désépingler' : 'Épingler'}
                      </span>
                      {selectedConv.isFavorite ? (
                        <PinOff size={14} className="text-on-surface/60" />
                      ) : (
                        <Pin size={14} className="text-on-surface/60" />
                      )}
                    </button>

                    <button 
                      onClick={startRename}
                      className="flex items-center justify-between gap-4 bg-surface hover:bg-gray-50 transition-all rounded-full py-2.5 px-6 shadow-xl border border-on-surface/5 group"
                    >
                      <span className="font-headline font-black text-[9px] uppercase tracking-[0.2em] text-on-surface group-active:scale-95 transition-transform">Renommer</span>
                      <Pencil size={14} className="text-on-surface/60" />
                    </button>

                    <button 
                      onClick={toggleBlocked}
                      className="flex items-center justify-between gap-4 bg-surface hover:bg-gray-50 transition-all rounded-full py-2.5 px-6 shadow-xl border border-on-surface/5 group"
                    >
                      <span className="font-headline font-black text-[9px] uppercase tracking-[0.2em] text-on-surface group-active:scale-95 transition-transform">Bloquer</span>
                      <User size={14} className="text-on-surface/60" strokeWidth={2.5} />
                    </button>

                    <button 
                      onClick={deleteConversation}
                      className="flex items-center justify-between gap-4 bg-surface hover:bg-red-50 transition-all rounded-full py-2.5 px-6 shadow-xl border border-on-surface/5 group"
                    >
                      <span className="font-headline font-black text-[9px] uppercase tracking-[0.2em] text-red-600 group-active:scale-95 transition-transform">Supprimer</span>
                      <Trash2 size={14} className="text-red-400/80" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar Removed */}
    </div>
  );
};
