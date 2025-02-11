import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Share2, RotateCcw, Download, Upload, Activity, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import type { SpeedTestResult } from '../types';
import { measureDownloadSpeed, measureUploadSpeed, measurePing } from '../utils/speedTest';

export function SpeedTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<'download' | 'upload' | 'ping' | null>(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSpeedTest = async () => {
    setIsRunning(true);
    setResult(null);
    setError(null);
    
    try {
      // Measure ping
      setCurrentTest('ping');
      setProgress(0);
      const ping = await measurePing();
      setProgress(100);

      // Measure download speed
      setCurrentTest('download');
      setProgress(0);
      const downloadSpeed = await measureDownloadSpeed();
      setProgress(100);

      // Measure upload speed
      setCurrentTest('upload');
      setProgress(0);
      const uploadSpeed = await measureUploadSpeed();
      setProgress(100);

      setResult({
        downloadSpeed,
        uploadSpeed,
        ping,
        timestamp: new Date(),
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
      setCurrentTest(null);
    }
  };

  const getSpeedMessage = (speed: number) => {
    if (speed > 70) return "Your internet is faster than light! 🚀";
    if (speed > 30) return "Your internet is cruising at a decent pace! 🚗";
    return "Your internet is slower than a snail! 🐌";
  };

  const getTestIcon = () => {
    switch (currentTest) {
      case 'download':
        return <Download className="w-16 h-16 text-purple-600" />;
      case 'upload':
        return <Upload className="w-16 h-16 text-purple-600" />;
      case 'ping':
        return <Activity className="w-16 h-16 text-purple-600" />;
      default:
        return <Gauge className="w-16 h-16 text-purple-600" />;
    }
  };

  const getTestMessage = () => {
    switch (currentTest) {
      case 'download':
        return "Measuring download speed...";
      case 'upload':
        return "Measuring upload speed...";
      case 'ping':
        return "Measuring ping...";
      default:
        return "Preparing speed test...";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <AnimatePresence mode="wait">
          {!isRunning && !result && !error && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <Button size="lg" onClick={runSpeedTest}>
                Start Speed Test
              </Button>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-xl p-6 text-center"
            >
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
              <p className="text-lg mb-4">{error}</p>
              <Button variant="secondary" onClick={() => {
                setError(null);
                runSpeedTest();
              }}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          )}

          {isRunning && (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="mb-4"
              >
                {getTestIcon()}
              </motion.div>
              <p className="text-lg mb-4">{getTestMessage()}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="bg-purple-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}

          {result && !error && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                {getSpeedMessage(result.downloadSpeed)}
              </h2>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Download className="w-5 h-5 mr-2 text-purple-600" />
                    <span>Download</span>
                  </div>
                  <span className="font-bold">{result.downloadSpeed.toFixed(1)} Mbps</span>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-purple-600" />
                    <span>Upload</span>
                  </div>
                  <span className="font-bold">{result.uploadSpeed.toFixed(1)} Mbps</span>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-600" />
                    <span>Ping</span>
                  </div>
                  <span className="font-bold">{result.ping.toFixed(0)} ms</span>
                </motion.div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    navigator.share?.({
                      title: 'My Internet Speed Test Result',
                      text: `Download: ${result.downloadSpeed.toFixed(1)} Mbps\nUpload: ${result.uploadSpeed.toFixed(1)} Mbps\nPing: ${result.ping.toFixed(0)} ms`,
                    }).catch(() => {});
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={runSpeedTest}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Test Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}