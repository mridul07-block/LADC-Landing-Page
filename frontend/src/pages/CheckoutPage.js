import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/AppContext';
import { courses } from '@/data/courses';

export default function CheckoutPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { mockUser, enrollCourse } = useAppStore();

  const course = courses.find((c) => c.id === courseId);

  const [name, setName] = useState(mockUser?.name || '');
  const [email, setEmail] = useState(mockUser?.email || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const finalPrice = useMemo(() => {
    if (!course) return 0;
    return Math.round(course.price_inr * (1 - discount / 100));
  }, [course, discount]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !cardNumber) return;
    setLoading(true);
    setTimeout(() => {
      enrollCourse(courseId);
      navigate(`/payment-success?course=${courseId}`);
    }, 1500);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found.</p>
          <Button variant="coral" onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 pt-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 focus-coral rounded transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Order summary */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-heading text-2xl text-foreground mb-2">Order Summary</h2>
            <div className="h-px bg-border my-4" />
            <h3 className="font-heading text-lg text-foreground mb-1">{course.name}</h3>
            <p className="text-sm text-gold mb-4">{course.tagline}</p>

            <ul className="space-y-2 mb-6">
              {course.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="h-px bg-border my-4" />

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm text-foreground">₹{course.price_inr.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-emerald-400">Discount ({discount}%)</span>
                <span className="text-sm text-emerald-400">-₹{(course.price_inr - finalPrice).toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="h-px bg-border my-3" />
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-foreground">Total</span>
              <span className="text-2xl font-bold text-coral">₹{finalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Payment form */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-heading text-2xl text-foreground mb-6">Payment Details</h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-10 h-10 border-3 border-coral border-t-transparent rounded-full"
                  style={{ borderWidth: '3px' }}
                />
                <p className="text-sm text-muted-foreground mt-4">Processing payment...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="h-11 bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Card Number</label>
                  <Input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="h-11 bg-background border-border text-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Expiry</label>
                    <Input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="h-11 bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">CVV</label>
                    <Input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="•••"
                      className="h-11 bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                {/* Coupon */}
                <div className="flex gap-2">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="h-10 bg-background border-border text-foreground"
                  />
                  <Button type="button" variant="ghost-light" onClick={applyCoupon}>Apply</Button>
                </div>
                {couponMsg.text && (
                  <p className={`text-xs ${couponMsg.type === 'success' ? 'text-emerald-400' : 'text-destructive'}`}>
                    {couponMsg.text}
                  </p>
                )}

                <Button type="submit" variant="coral" className="w-full" size="lg">
                  <Lock className="w-4 h-4 mr-1" /> Pay ₹{finalPrice.toLocaleString('en-IN')}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure mock payment · No real charges
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
