import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/AppContext';
import { useNavigate } from 'react-router-dom';

export const PaymentModal = () => {
  const { isPaymentModalOpen, closePaymentModal, selectedCourse } = useAppStore();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState({ text: '', type: '' });

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === 'DANCE10') {
      setDiscount(10);
      setCouponMsg({ text: '10% discount applied!', type: 'success' });
    } else if (code === 'LADC20') {
      setDiscount(20);
      setCouponMsg({ text: '20% discount applied!', type: 'success' });
    } else {
      setDiscount(0);
      setCouponMsg({ text: 'Invalid coupon code', type: 'error' });
    }
  };

  const finalPrice = useMemo(() => {
    if (!selectedCourse) return 0;
    return Math.round(selectedCourse.price_inr * (1 - discount / 100));
  }, [selectedCourse, discount]);

  const handleProceed = () => {
    if (!selectedCourse) return;
    closePaymentModal();
    navigate(`/checkout/${selectedCourse.id}`);
  };

  const handleClose = () => {
    setCoupon('');
    setDiscount(0);
    setCouponMsg({ text: '', type: '' });
    closePaymentModal();
  };

  return (
    <AnimatePresence>
      {isPaymentModalOpen && selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground focus-coral"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-heading text-xl text-foreground mb-1">{selectedCourse.name}</h2>
            <p className="text-sm text-gold mb-4">{selectedCourse.tagline}</p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-coral">₹{finalPrice.toLocaleString('en-IN')}</span>
              {discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">₹{selectedCourse.price_inr.toLocaleString('en-IN')}</span>
              )}
              <span className="text-xs text-muted-foreground">one-time payment, lifetime access</span>
            </div>

            {/* Includes */}
            <ul className="space-y-2 mb-4">
              {selectedCourse.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="h-px bg-border my-4" />

            {/* Coupon */}
            <div className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="h-10 pl-9 bg-background border-border text-foreground"
                />
              </div>
              <Button variant="ghost-light" onClick={applyCoupon}>Apply</Button>
            </div>
            {couponMsg.text && (
              <p className={`text-xs mb-4 ${couponMsg.type === 'success' ? 'text-emerald-400' : 'text-destructive'}`}>
                {couponMsg.text}
              </p>
            )}

            <Button variant="coral" className="w-full" size="lg" onClick={handleProceed}>
              Proceed to Pay
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Secure mock payment · No real charges
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
