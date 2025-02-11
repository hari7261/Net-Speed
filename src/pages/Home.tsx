import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gauge, Wifi, Zap, Globe2, Award, BarChart3 } from 'lucide-react';
import { Button } from '../components/Button';

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: typeof Gauge;
  title: string;
  description: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/10"
    >
      <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-purple-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const StatsCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-purple-600 mb-2">{value}</div>
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
    </motion.div>
  );
};

export function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block mb-8"
        >
          <Gauge className="w-20 h-20 text-purple-600" />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Test Your Internet Speed
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-center text-gray-600 dark:text-gray-300 max-w-2xl">
          Get instant, accurate results with our advanced speed testing platform. 
          Measure your download speed, upload speed, and ping with precision.
        </p>

        <Button
          size="lg"
          onClick={() => navigate('/test')}
          className="shadow-lg shadow-purple-500/20"
        >
          Check Your Speed
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-purple-500"
          >
            <BarChart3 className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-500/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            Why Choose Our Speed Test?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Get accurate speed measurements in seconds with our optimized testing algorithm"
            />
            <FeatureCard
              icon={Globe2}
              title="Global Servers"
              description="Connect to the nearest server for the most accurate results"
            />
            <FeatureCard
              icon={Award}
              title="Precise Results"
              description="Real-time measurements using enterprise-grade technology"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter value="99.9%" label="Accuracy" />
            <StatsCounter value="0.5s" label="Response Time" />
            <StatsCounter value="50+" label="Global Servers" />
            <StatsCounter value="1M+" label="Tests Run" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-t from-transparent to-purple-500/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Test Your Speed?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg mb-8 text-gray-600 dark:text-gray-300"
          >
            Get instant results and see how your internet performs against global standards.
          </motion.p>
          <Button size="lg" onClick={() => navigate('/test')}>
            Start Speed Test Now
          </Button>
        </div>
      </div>
    </div>
  );
}