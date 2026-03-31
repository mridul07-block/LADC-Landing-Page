import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { VideoLightbox } from '@/components/modals/VideoLightbox';

const videos = [
  { id: 'NHxQBeiGkbE', title: 'Bollywood Wedding Medley' },
  { id: 'gr8vc-IZwvE', title: 'Jazz Contemporary' },
  { id: 'QMx6sj2Bq8E', title: 'Hip Hop Showcase' },
  { id: 'Y1GbWZBAR64', title: 'Sangeet Choreography' },
  { id: 'kPbdqKrjr-0', title: 'Online Class Highlights' },
  { id: 'DE82U8NYKBs', title: 'Student Reel' },
];

export const VideoReelWall = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="reels" className="py-20 sm:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-coral text-sm font-semibold tracking-wider uppercase mb-3">Gallery</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
              See us in action
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, i) => (
            <ScrollReveal key={video.id} delay={i * 0.08}>
              <motion.button
                whileHover={{ borderColor: 'hsl(15, 71%, 52%)' }}
                onClick={() => setActiveVideo(video.id)}
                className="w-full aspect-video bg-brand-surface rounded-xl border border-border flex flex-col items-center justify-center gap-2 relative overflow-hidden group focus-coral"
              >
                {/* YouTube thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-14 h-14 rounded-full bg-coral/30 backdrop-blur-sm flex items-center justify-center border border-coral/40"
                  >
                    <Play className="w-6 h-6 text-foreground ml-0.5" />
                  </motion.div>
                </div>
                <p className="relative z-10 text-xs text-foreground/80 font-medium mt-1">{video.title}</p>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <VideoLightbox
        videoId={activeVideo || ''}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
};
