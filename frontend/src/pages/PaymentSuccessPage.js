import React, { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/courses';

const confettiColors = ['hsl(15, 71%, 52%)', 'hsl(36, 87%, 55%)', 'hsl(30, 33%, 94%)'];

function ConfettiPiece({ index }) {
  const angle = (index / 30) * 360;
  const distance = 80 + Math.random() * 200;
  const size = 4 + Math.random() * 8;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;
  const color = confettiColors[index % confettiColors.length];
  const rotation = Math.random() * 360;

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{
        x,
        y: y + 100,
        opacity: 0,
        scale: 1,
        rotate: rotation,
      }}
      transition={{ duration: 1.5, delay: 0.3 + index * 0.03, ease: 'easeOut' }}
      className="absolute rounded-sm"
      style={{
        width: size,
        height: size * 1.5,
        backgroundColor: color,
        left: '50%',
        top: '40%',
      }}
    />
  );
}

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');

  const course = useMemo(
    () => courses.find((c) => c.id === courseId),
    [courseId]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Confetti */}
      {Array.from({ length: 30 }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}

      <div className="relative z-10 text-center px-4 max-w-md">
        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
            className="w-14 h-14 rounded-full bg-coral flex items-center justify-center"
          >
            <Check className="w-7 h-7 text-primary-foreground" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-heading text-3xl sm:text-4xl text-foreground mb-3"
        >
          Payment successful!
        </motion.h1>

        {course && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gold text-base mb-2"
          >
            {course.name}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground mb-8"
        >
          You&apos;re officially enrolled!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button variant="coral" size="lg" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button variant="ghost-light" size="lg" onClick={() => navigate('/#courses')}>
            Back to Courses
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
