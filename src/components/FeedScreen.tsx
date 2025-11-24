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
    <div 
      className="h-full flex flex-col"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      {/* Header with App Name */}
      <div className="relative px-6 pt-14 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <h2 
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--line-height-tight)'
            }}
          >
            Know That Person
          </h2>
          <p 
            className="mt-1"
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-normal)'
            }}
          >
            Scenarios for you
          </p>
        </motion.div>
      </div>

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div style={{ color: 'var(--color-text-secondary)' }}>Loading scenarios...</div>
          </div>
        ) : displayScenarios.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div style={{ color: 'var(--color-text-secondary)' }}>No scenarios found</div>
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
            className="w-full text-left transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-lg)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Category tag */}
            <div 
              className="inline-flex items-center mb-3"
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
            <h3 
              className="mb-2"
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-tight)'
              }}
            >
              {scenario.title}
            </h3>

            {/* Preview */}
            <p 
              className="mb-3 line-clamp-3"
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-body)',
                lineHeight: 'var(--line-height-relaxed)'
              }}
            >
              {scenario.preview}
            </p>

            {/* Read more */}
            <div className="flex items-center gap-1" style={{ color: 'var(--color-button-primary-start)' }}>
              <span style={{ fontSize: 'var(--font-size-sm)' }}>Read more</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div 
        className="px-6 py-4"
        style={{
          borderTop: `1px solid var(--color-input-border)`,
          backgroundColor: 'var(--color-card-bg)'
        }}
      >
        <div className="flex items-center justify-around">
          <button 
            className="flex flex-col items-center transition-colors"
            style={{ color: 'var(--color-button-primary-start)' }}
          >
            <Home className="w-6 h-6 mb-1" />
            <span style={{ fontSize: 'var(--font-size-xs)' }}>Home</span>
          </button>
          <button 
            onClick={onNavigateToCategories} 
            className="flex flex-col items-center transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Grid3x3 className="w-6 h-6 mb-1" />
            <span style={{ fontSize: 'var(--font-size-xs)' }}>Categories</span>
          </button>
          <button 
            className="flex flex-col items-center transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <User className="w-6 h-6 mb-1" />
            <span style={{ fontSize: 'var(--font-size-xs)' }}>You</span>
          </button>
        </div>
      </div>
    </div>
  );
}