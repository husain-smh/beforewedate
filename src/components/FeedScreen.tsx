import { motion } from 'motion/react';
import { ChevronRight, Home, Grid3x3, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Scenario {
  id: string;
  title: string;
  preview: string;
  category: string;
  tags?: string[];
  shareCount?: number;
}

interface FeedScreenProps {
  categories: string[];
  onScenarioClick: (scenario: Scenario) => void;
  onNavigateToCategories: () => void;
}

export function FeedScreen({ categories, onScenarioClick, onNavigateToCategories }: FeedScreenProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScenarios() {
      try {
        setLoading(true);
        const categoryParam = categories.length > 0 ? categories.join(',') : '';
        const url = categoryParam 
          ? `/api/scenarios?category=${encodeURIComponent(categoryParam)}&limit=50`
          : '/api/scenarios?limit=50';
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setScenarios(data.scenarios || []);
        }
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchScenarios();
  }, [categories.join(',')]);

  const displayScenarios = scenarios;

  return (
    <div className="h-full flex flex-col bg-[#0B0B0D]">
      {/* Header with App Name */}
      <div className="relative px-3 pt-14 pb-4 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <h2 className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent text-xl">
            Know That Person
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Scenarios for you
          </p>
        </motion.div>
      </div>

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400">Loading scenarios...</div>
          </div>
        ) : displayScenarios.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400">No scenarios found</div>
          </div>
        ) : (
          displayScenarios.map((scenario, index) => (
          <motion.button
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onScenarioClick(scenario)}
            className="w-full text-left"
          >
            <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#15151a] rounded-3xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Category chip - enhanced with gradient ring */}
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-400/30 mb-2 shadow-sm shadow-purple-500/20">
                  <span className="text-purple-300">{scenario.category}</span>
                </div>

                {/* Title - more prominent */}
                <h3 className="text-white mb-2 leading-snug pr-2">
                  {scenario.title}
                </h3>

                {/* Preview - softer color for better readability */}
                <p className="text-[#B8B7C8] mb-3 leading-[1.7] line-clamp-3">
                  {scenario.preview}
                </p>

                {/* Read more */}
                <div className="flex items-center text-pink-400 group">
                  <span className="mr-1">Read more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.button>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-white/5 px-3 py-4 bg-[#0B0B0D]">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center text-pink-400 transition-colors">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={onNavigateToCategories} className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors">
            <Grid3x3 className="w-6 h-6 mb-1" />
            <span className="text-xs">Categories</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors">
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">You</span>
          </button>
        </div>
      </div>
    </div>
  );
}