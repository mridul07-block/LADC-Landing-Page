import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/ui/CourseCard';
import { VideoLightbox } from '@/components/modals/VideoLightbox';
import { useAppStore } from '@/store/AppContext';
import { courses } from '@/data/courses';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { mockUser, mockLogout, enrolledCourseIds, handleEnrol } = useAppStore();
  const [lightboxVideo, setLightboxVideo] = useState(null);

  useEffect(() => {
    if (!mockUser) {
      navigate('/');
    }
  }, [mockUser, navigate]);

  if (!mockUser) return null;

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const exploreCourses = courses.filter((c) => !enrolledCourseIds.includes(c.id));

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCourseIds.length },
    { icon: Award, label: 'Certificates Earned', value: 0 },
    { icon: Globe, label: 'Countries in Community', value: '15+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border" style={{ backgroundColor: 'rgba(14, 10, 10, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="flex items-baseline gap-0.5 focus-coral rounded">
              <span className="font-heading text-xl font-bold text-foreground">LADC</span>
              <span className="w-1.5 h-1.5 rounded-full bg-coral inline-block" />
            </button>
            <span className="text-sm text-muted-foreground hidden sm:inline">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground">Welcome back, {mockUser.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { mockLogout(); navigate('/'); }}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-coral/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* My Courses */}
        <ScrollReveal>
          <h2 className="font-heading text-2xl text-foreground mb-6">My Courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center mb-12">
              {/* Dancer silhouette SVG */}
              <svg className="w-24 h-24 mx-auto mb-4 text-coral" fill="currentColor" viewBox="0 0 100 100">
                <path d="M50 10c-3 0-5.5 2.5-5.5 5.5S47 21 50 21s5.5-2.5 5.5-5.5S53 10 50 10zm-8 16l-12 20 4 2 10-14 2 8-16 24 4 3 14-18 14 18 4-3-16-24 2-8 10 14 4-2-12-20h-12z" />
              </svg>
              <p className="text-muted-foreground mb-4">No courses yet. Browse our catalogue.</p>
              <Button variant="coral" onClick={() => navigate('/#courses')}>
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {enrolledCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-brand-surface flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`}
                      alt={course.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <span className="relative z-10 px-3 py-1 rounded-full bg-violet/80 text-xs text-primary-foreground font-medium">
                      Course video coming soon
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-foreground mb-2">{course.name}</h3>
                    {/* Progress bar (mock) */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-brand-surface">
                        <div className="h-full rounded-full bg-coral" style={{ width: '0%' }} />
                      </div>
                    </div>
                    <Button
                      variant="coral"
                      className="w-full"
                      onClick={() => setLightboxVideo(course.videoId)}
                    >
                      Continue Learning
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollReveal>

        {/* Explore More */}
        {exploreCourses.length > 0 && (
          <ScrollReveal>
            <h2 className="font-heading text-2xl text-foreground mb-6">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnrol={handleEnrol}
                  isEnrolled={false}
                />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>

      <VideoLightbox
        videoId={lightboxVideo || ''}
        isOpen={!!lightboxVideo}
        onClose={() => setLightboxVideo(null)}
      />
    </div>
  );
}
