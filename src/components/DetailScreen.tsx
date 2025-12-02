import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Copy, Check } from 'lucide-react';
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

  const handleOpenShareLink = () => {
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };


  return (
    <>
      <div 
        className="flex flex-col relative"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 md:pt-8 pb-4 z-20">
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
        <div className="px-6 py-4 relative z-10">
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
              className="mb-4"
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-tight)'
              }}
            >
              {scenario.title}
            </h1>

            {/* Full Text */}
            <p 
              className="mb-6"
              style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-body)',
                lineHeight: 'var(--line-height-relaxed)',
                paddingLeft: '0.25rem',
                paddingRight: '0.25rem'
              }}
            >
              {scenario.fullText}
            </p>

            {/* Share Button - Main Action */}
            <div className="mb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                disabled={isSharing}
                className="relative w-full overflow-hidden transition-all duration-300"
                style={{
                  height: '56px',
                  borderRadius: 'var(--radius-full)',
                  background: isSharing
                    ? 'linear-gradient(135deg, #E5E7EB, #D1D5DB)'
                    : 'linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end))',
                  boxShadow: isSharing ? 'none' : 'var(--shadow-lg)',
                  opacity: isSharing ? 0.6 : 1,
                  cursor: isSharing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-sm)'
                }}
              >
                <Share2 className="w-5 h-5" style={{ color: 'var(--color-button-text)' }} />
                <span style={{
                  color: 'var(--color-button-text)',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  {isSharing ? 'Generating link...' : 'Ask someone'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Share Link Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent 
          className="sm:max-w-md"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: `1px solid var(--color-input-border)`,
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <DialogHeader>
            <DialogTitle 
              className="text-center"
              style={{
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)'
              }}
            >
              Share with your partner
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Share Link */}
            <div className="relative">
              <div 
                className="rounded-xl p-4 pr-16"
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  border: `1px solid var(--color-input-border)`
                }}
              >
                <p 
                  className="text-sm break-all font-mono pr-12"
                  style={{
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {shareUrl}
                </p>
              </div>
              
              {/* Copy Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: copied 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : 'rgba(168, 85, 247, 0.1)',
                  border: `1px solid ${copied ? 'rgba(16, 185, 129, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`,
                  color: copied 
                    ? '#10B981' 
                    : 'var(--color-button-primary-start)'
                }}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </motion.button>
            </div>

            {/* Info text */}
            <p 
              className="text-xs text-center"
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-xs)',
                lineHeight: 'var(--line-height-normal)'
              }}
            >
              Share this link to know their perspective. And then write yours.
            </p>
          </div>

          {shareUrl && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenShareLink}
              className="w-full rounded-full py-3 font-semibold text-sm tracking-wide"
              style={{
                background: 'linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end))',
                color: 'var(--color-button-text)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              Tell your Perspective
            </motion.button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}