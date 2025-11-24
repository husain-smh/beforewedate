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
      <div 
        className="h-full flex flex-col relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
      >
        {/* Header */}
        <div className="relative px-6 pt-14 pb-4 z-20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontSize: 'var(--font-size-base)' }}>Back to Scenarios</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category tag */}
            <div 
              className="inline-flex items-center mb-4"
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-tag-bg)',
                border: `1px solid var(--color-tag-border)`
              }}
            >
              <span style={{ 
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-tag-text)'
              }}>
                {scenario.category}
              </span>
            </div>

            {/* Title */}
            <h1 
              className="mb-6"
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-tight)'
              }}
            >
              {scenario.title}
            </h1>

            {/* Prompt Box */}
            <div 
              className="mb-4"
              style={{
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-input-bg)',
                border: `1px solid var(--color-input-border)`
              }}
            >
              <p style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-body)',
                lineHeight: 'var(--line-height-normal)'
              }}>
                Share your honest thoughts. What would you do in this situation and why?
              </p>
            </div>

            {/* Input Field */}
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full mb-6 resize-none"
              style={{
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-input-bg)',
                border: `1px solid var(--color-input-border)`,
                color: 'var(--color-input-text)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-normal)',
                minHeight: '120px',
                fontFamily: 'inherit'
              }}
            />

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="relative w-full overflow-hidden transition-all duration-300 mb-4"
              style={{
                height: '56px',
                borderRadius: 'var(--radius-full)',
                background: answer.trim()
                  ? 'linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end))'
                  : 'linear-gradient(135deg, #E5E7EB, #D1D5DB)',
                boxShadow: answer.trim() ? 'var(--shadow-lg)' : 'none',
                opacity: answer.trim() ? 1 : 0.5,
                cursor: answer.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)',
                marginLeft: 'auto'
              }}
            >
              <span style={{
                color: 'var(--color-button-text)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-semibold)'
              }}>
                Submit
              </span>
              <Send className="w-5 h-5" style={{ color: 'var(--color-button-text)' }} />
            </motion.button>

            {/* Disclaimer */}
            <p 
              className="text-center"
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-normal)'
              }}
            >
              Your answer will be saved and can be shared with your partner.
            </p>
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
              Send this link to your partner to see their perspective. You can write yours too.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}