import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/AppContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, mockLogin } = useAppStore();
  const [tab, setTab] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const displayName = tab === 'create' ? name || 'Student' : email.split('@')[0];
    mockLogin(displayName, email);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={closeAuthModal}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground focus-coral"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Tabs */}
            <div className="flex gap-6 mb-6">
              {['signin', 'create'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative pb-2 text-sm font-medium transition-colors duration-200 ${
                    tab === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t === 'signin' ? 'Sign in' : 'Create account'}
                  {tab === t && (
                    <motion.div
                      layoutId="authTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'create' && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-11 bg-background border-border text-foreground focus-visible:ring-coral"
                  />
                </div>
              )}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 bg-background border-border text-foreground focus-visible:ring-coral"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 bg-background border-border text-foreground pr-10 focus-visible:ring-coral"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" variant="coral" className="w-full" size="lg">
                Continue
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              No payment required to browse. Enrol when ready.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
