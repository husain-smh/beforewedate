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
    <div className="h-full flex flex-col bg-[#0B0B0D] relative overflow-hidden">
      {/* Romantic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-pink-900/10 to-transparent pointer-events-none" />
      
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
      <div className="relative px-6 pt-14 pb-6 border-b border-white/5 z-20">
        <button 
          onClick={onBack}
          className="absolute left-6 top-14 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent mb-2">
            Your takes together
          </h2>
          <p className="text-gray-400 text-sm">
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
            <span className="text-gray-400">Your take</span>
          </div>
          
          <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#15151a] rounded-3xl p-5 border border-white/5 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl pointer-events-none" />
            <p className="text-[#DAD9E8] leading-[1.7] relative z-10">
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
            <span className="text-gray-400">Their take</span>
          </div>
          
          <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#15151a] rounded-3xl p-5 border border-teal-400/20 shadow-xl shadow-teal-500/10">
            {/* Subtle highlight glow for partner's answer */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-3xl pointer-events-none" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-2 -right-2"
            >
              <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-full p-2 shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            
            <p className="text-[#DAD9E8] leading-[1.7] relative z-10">
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
          <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#15151a] rounded-3xl p-5 border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-teal-500/5 rounded-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Your connection</span>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span className="text-pink-400">{alignment}%</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${alignment}%` }}
                  transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-400 rounded-full"
                />
              </div>
              
              <p className="text-gray-400 text-sm mt-3 text-center">
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
          className="relative w-full h-14 rounded-full overflow-hidden shadow-lg shadow-purple-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400" />
          <div className="absolute inset-0 flex items-center justify-center text-white gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="tracking-wide">Discuss this together</span>
          </div>
        </motion.button>

        {/* Soft encouraging message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-gray-500 text-sm mt-4"
        >
          Honest conversations strengthen relationships ✨
        </motion.p>
      </div>
    </div>
  );
}
