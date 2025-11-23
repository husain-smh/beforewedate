import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Share2, Heart, Copy, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Scenario {
  id: string;
  title: string;
  preview?: string;
  category: string;
  fullText: string;
}

interface DetailScreenProps {
  scenario: Scenario;
  onBack: () => void;
  onAnswerSubmit: (answer: string) => void;
}

export function DetailScreen({ scenario, onBack, onAnswerSubmit }: DetailScreenProps) {
  const [answer, setAnswer] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: scenario.id }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setShareUrl(data.shareUrl);
        setShowShareDialog(true);
      } else {
        console.error('Failed to create share');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopy = async () => {
    if (shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswerSubmit(answer);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col bg-[#0B0B0D] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-pink-900/5 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="relative px-3 pt-14 pb-3 border-b border-white/5 z-20">
        <button 
          onClick={onBack}
          className="absolute left-3 top-14 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-gray-400">Scene</h2>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Category chip - enhanced */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-400/30 mb-2 shadow-sm shadow-purple-500/20">
            <span className="text-purple-300">{scenario.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-white mb-2 leading-tight text-lg">
            {scenario.title}
          </h1>

          {/* Story - no container, smaller font */}
          <p className="text-[#DAD9E8] text-sm leading-[1.7] whitespace-pre-line mb-3">
            {scenario.fullText}
          </p>

          {/* Share Button - with heart pulse animation */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            disabled={isSharing}
            className="relative w-full h-14 rounded-full overflow-hidden mb-4 shadow-lg shadow-purple-500/20 group disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-teal-400" />
            
            {/* Heart pulse effect */}
            {isSharing && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-white fill-white" />
              </motion.div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center text-white gap-2">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">{isSharing ? 'Creating link...' : 'Ask your partner'}</span>
            </div>
          </motion.button>

          {/* Answer Section */}
          <div className="mb-4">
            <h3 className="text-white mb-3">
              What's your honest take?
            </h3>
            
            <div className="relative bg-[#15151a] rounded-3xl border border-white/5 overflow-hidden shadow-inner">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your honest take…"
                className="w-full bg-transparent text-[#DAD9E8] placeholder-gray-500 p-4 min-h-[120px] resize-none outline-none"
                style={{ lineHeight: '1.7' }}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className={`relative w-full h-12 rounded-full overflow-hidden mt-4 transition-opacity ${
                !answer.trim() ? 'opacity-40 cursor-not-allowed' : 'shadow-lg shadow-pink-500/20'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400" />
              <div className="absolute inset-0 flex items-center justify-center text-white gap-2">
                <span className="tracking-wide">Send your take</span>
                <Send className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>

      {/* Share Link Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md bg-[#15151a] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white text-center">
              Share with your partner
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Share Link */}
            <div className="relative">
              <div className="bg-[#0B0B0D] border border-white/10 rounded-xl p-4 pr-16">
                <p className="text-pink-300 text-sm break-all font-mono pr-12">
                  {shareUrl}
                </p>
              </div>
              
              {/* Copy Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-all ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30'
                }`}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>

            {/* Info text */}
            <p className="text-xs text-gray-500 text-center">
              Send this link to your partner to see their perspective
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}