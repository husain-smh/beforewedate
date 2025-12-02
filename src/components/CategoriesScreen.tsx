import { useState, useEffect, type ReactElement } from 'react';
import { motion } from 'motion/react';
import { Heart, Target, DollarSign, Star, Home, Users, ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: ReactElement;
  backgroundColor: string;
  textColor: string;
}

const categories: Category[] = [
  {
    id: 'loyalty',
    name: 'Loyalty',
    icon: <Heart className="w-8 h-8" />,
    backgroundColor: '#FCE7F3', // Light pink
    textColor: '#EC4899' // Pink
  },
  {
    id: 'boundaries',
    name: 'Boundaries',
    icon: <Target className="w-8 h-8" />,
    backgroundColor: '#DBEAFE', // Light blue
    textColor: '#3B82F6' // Blue
  },
  {
    id: 'money',
    name: 'Money',
    icon: <DollarSign className="w-8 h-8" />,
    backgroundColor: '#D1FAE5', // Light green
    textColor: '#10B981' // Green
  },
  {
    id: 'intimacy',
    name: 'Intimacy',
    icon: <Star className="w-8 h-8" />,
    backgroundColor: '#E9D5FF', // Light purple
    textColor: '#A855F7' // Purple
  },
  {
    id: 'family',
    name: 'Family',
    icon: <Home className="w-8 h-8" />,
    backgroundColor: '#FED7AA', // Light orange/peach
    textColor: '#F97316' // Orange
  },
  {
    id: 'ambition',
    name: 'Ambition',
    icon: <Users className="w-8 h-8" />,
    backgroundColor: '#E9D5FF', // Light lavender
    textColor: '#A78BFA' // Lavender
  }
];

interface CategoriesScreenProps {
  onContinue: (categories: string[]) => void;
  initialSelected?: string[];
  onBack?: () => void;
}

export function CategoriesScreen({ onContinue, initialSelected = [], onBack }: CategoriesScreenProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  // Sync selected state when initialSelected changes
  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const toggleCategory = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    onContinue(selected);
  };

  return (
    <div
      className="flex flex-col px-6 md:px-8 lg:px-12 py-8 md:py-10 relative"
      style={{
        color: 'var(--color-text-primary, #4C1D95)',
        background: 'linear-gradient(145deg, var(--color-surface-cream), transparent)',
        minHeight: '100%'
      }}
    >
      {/* Header section with back button and title */}
      <div className="relative z-20 pt-6 md:pt-8 pb-6">
        {/* Back button */}
        {onBack && (
          <div className="mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 transition-colors"
              style={{ 
                color: 'var(--color-text-secondary, #6B7280)',
                fontSize: 'var(--font-size-base, 1rem)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                margin: 0
              }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-secondary, #6B7280)' }} />
              <span style={{ color: 'var(--color-text-secondary, #6B7280)' }}>Back to Scenarios</span>
            </button>
          </div>
        )}
      
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <h1
            style={{
              fontSize: 'var(--font-size-xl, 1.25rem)',
              fontWeight: 'var(--font-weight-semibold, 600)',
              color: 'var(--color-text-display, #2F2A1F)',
              lineHeight: 'var(--line-height-tight, 1.25)',
              margin: '0 0 0.5rem 0',
              padding: 0,
              letterSpacing: '0.01em'
            }}
          >
            Categories
          </h1>
          <p 
            style={{ 
              fontSize: 'var(--font-size-sm, 0.9rem)',
              color: 'var(--color-text-secondary, #6B7280)',
              lineHeight: 'var(--line-height-relaxed, 1.6)',
              margin: '0 0 1.5rem 0',
              padding: 0,
              fontStyle: 'italic'
            }}
          >
            "The best way to test your partner? Go through these scenarios together and see what happens." — Mama Taylor
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10 mb-6">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleCategory(category.id)}
            className="relative transition-all duration-300 flex flex-col items-center justify-center text-center"
            style={{
              backgroundColor: category.backgroundColor,
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.5rem',
              minHeight: '140px',
              boxShadow: selected.includes(category.id)
                ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: selected.includes(category.id)
                ? `2px solid ${category.textColor}`
                : 'none',
              gap: '1rem',
              transform: selected.includes(category.id) ? 'scale(1.02)' : 'scale(1)'
            }}
            aria-pressed={selected.includes(category.id)}
          >
            {/* Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                  justifyContent: 'center',
                color: category.textColor
                }}
              >
                {category.icon}
            </div>

            {/* Category Name */}
            <span
              style={{
                fontSize: 'var(--font-size-base, 1rem)',
                fontWeight: 'var(--font-weight-semibold, 600)',
                color: category.textColor,
                lineHeight: 'var(--line-height-tight, 1.25)',
                textAlign: 'center',
                padding: 0,
                margin: 0
              }}
            >
              {category.name}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileTap={{ scale: 0.97 }}
        disabled={selected.length === 0}
        onClick={handleContinue}
        className="relative mt-6 w-full overflow-hidden transition-all duration-300 z-10"
        style={{
          height: '56px',
          borderRadius: 'var(--radius-full)',
          background: selected.length === 0
            ? 'linear-gradient(135deg, #E5E7EB, #D1D5DB)'
            : 'linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end))',
          boxShadow: selected.length === 0 
            ? 'none' 
            : 'var(--shadow-lg)',
          opacity: selected.length === 0 ? 0.5 : 1,
          cursor: selected.length === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        <span 
          style={{
            color: 'var(--color-button-text, #FFFFFF)',
            fontSize: 'var(--font-size-base, 1rem)',
            fontWeight: 'var(--font-weight-semibold, 600)',
            letterSpacing: '0.025em',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          Continue
        </span>
      </motion.button>
    </div>
  );
}