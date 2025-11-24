import { motion } from 'motion/react';
import { ArrowLeft, Heart, Sparkles, MessageCircle } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  category: string;
}

interface CompareAnswersScreenProps {
  scenario: Scenario;
  userAnswer: string;
  onBack: () => void;
}

export function CompareAnswersScreen({ scenario, userAnswer, onBack }: CompareAnswersScreenProps) {
  // Mock partner answer for demo
  const partnerAnswer = "I think you're absolutely right to prioritize your financial future. Your sister's wedding is important, but it shouldn't come at the cost of your long-term goals. A real family member would understand that. Plus, her history of not paying back loans is a huge red flag. You worked hard for 3 years - that shows incredible discipline and commitment to your dreams. Don't let guilt make you sacrifice what you've built.";

  // Simple alignment calculation (in real app this would be more sophisticated)
  const alignment = 85;

  return (
    <div 
      className="h-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      
      {/* Confetti-like sparkles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-20 left-10"
      >
        <Sparkles className="w-4 h-4 text-pink-400/40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-32 right-12"
      >
        <Sparkles className="w-3 h-3 text-purple-400/40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute top-24 right-20"
      >
        <Sparkles className="w-3 h-3 text-teal-400/40" />
      </motion.div>
      
      {/* Header */}
      <div className="relative px-6 pt-14 pb-6 z-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontSize: 'var(--font-size-base)' }}>Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4"
        >
          <h2 
            className="mb-2"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--line-height-tight)'
            }}
          >
            Your takes together
          </h2>
          <p style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--line-height-normal)'
          }}>
            on "{scenario.title.substring(0, 50)}..."
          </p>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
        
        {/* Your Answer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-sm">You</span>
            </div>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}>
              Your take
            </span>
          </div>
          
          <div 
            className="relative rounded-3xl p-5 shadow-lg"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: `1px solid var(--color-input-border)`
            }}
          >
            <p 
              className="leading-[1.7] relative z-10"
              style={{
                color: 'var(--color-text-body)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)'
              }}
            >
              {userAnswer}
            </p>
          </div>
        </motion.div>

        {/* Partner's Answer - with reveal animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span style={{ 
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}>
              Their take
            </span>
          </div>
          
          <div 
            className="relative rounded-3xl p-5 shadow-xl"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: `2px solid var(--color-icon-circle-start)`
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-2 -right-2"
            >
              <div 
                className="rounded-full p-2 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end))'
                }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            
            <p 
              className="leading-[1.7] relative z-10"
              style={{
                color: 'var(--color-text-body)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-relaxed)'
              }}
            >
              {partnerAnswer}
            </p>
          </div>
        </motion.div>

        {/* Alignment indicator - soft and non-judgmental */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-6"
        >
          <div 
            className="relative rounded-3xl p-5"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: `1px solid var(--color-input-border)`
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span style={{ 
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)'
                }}>
                  Your connection
                </span>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" style={{ color: 'var(--color-button-primary-start)' }} fill="currentColor" />
                  <span style={{ 
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-button-primary-start)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    {alignment}%
                  </span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--color-input-bg)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${alignment}%` }}
                  transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-icon-circle-start), var(--color-icon-circle-end))'
                  }}
                />
              </div>
              
              <p 
                className="mt-3 text-center"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-normal)'
                }}
              >
                You're both seeing this from a similar place
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA - gentle and romantic */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileTap={{ scale: 0.97 }}
          className="relative w-full overflow-hidden"
          style={{
            height: '56px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end))',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)'
          }}
        >
          <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-button-text)' }} />
          <span style={{
            color: 'var(--color-button-text)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-semibold)',
            letterSpacing: '0.025em'
          }}>
            Discuss this together
          </span>
        </motion.button>

        {/* Soft encouraging message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-4"
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-height-normal)'
          }}
        >
          Honest conversations strengthen relationships ✨
        </motion.p>
      </div>
    </div>
  );
}
