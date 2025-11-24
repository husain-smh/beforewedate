import { useState, useEffect, type ReactElement } from 'react';
import { motion } from 'motion/react';
import { Heart, Lock, Shield, DollarSign, ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: ReactElement;
  iconColor: string;
}

const categories: Category[] = [
  {
    id: 'relationship-dynamics',
    name: 'Relationship Dynamics',
    description: 'How you handle the ups and downs together',
    icon: <Heart className="w-6 h-6" />,
    iconColor: '#EF4444' // Red heart
  },
  {
    id: 'loyalty',
    name: 'Loyalty & Jealousy',
    description: 'Trust issues and commitment boundaries',
    icon: <Lock className="w-6 h-6" />,
    iconColor: '#F59E0B' // Gold padlock
  },
  {
    id: 'boundaries',
    name: 'Boundaries & Privacy',
    description: 'Personal space and respect limits',
    icon: <Shield className="w-6 h-6" />,
    iconColor: '#3B82F6' // Blue shield
  },
  {
    id: 'money',
    name: 'Money & Power',
    description: 'Financial decisions and control dynamics',
    icon: <DollarSign className="w-6 h-6" />,
    iconColor: '#F59E0B' // Gold money bag
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
      className="h-full flex flex-col px-6 pb-8 relative overflow-hidden"
      style={{ 
        color: 'var(--color-text-primary, #4C1D95)',
        backgroundColor: 'transparent'
      }}
    >
      {/* Header section with back button and title */}
      <div className="relative z-20 pt-14 pb-6">
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
              fontSize: 'var(--font-size-2xl, 1.5rem)',
              fontWeight: 'var(--font-weight-bold, 700)',
              color: 'var(--color-text-primary, #4C1D95)',
              lineHeight: 'var(--line-height-tight, 1.25)',
              margin: '0 0 0.75rem 0',
              padding: 0
            }}
          >
            Categories
          </h1>
          <p 
            style={{ 
              fontSize: 'var(--font-size-base, 1rem)',
              color: 'var(--color-text-secondary, #6B7280)',
              lineHeight: 'var(--line-height-normal, 1.5)',
              margin: '0 0 2rem 0',
              padding: 0
            }}
          >
            Choose a category to explore scenarios
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto relative z-10">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleCategory(category.id)}
            className="relative w-full text-left transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-md)',
              boxShadow: selected.includes(category.id) 
                ? 'var(--shadow-lg)' 
                : 'var(--shadow-md)',
              border: selected.includes(category.id)
                ? '2px solid var(--color-icon-circle-start)'
                : 'none'
            }}
          >
            <div className="flex items-center gap-4">
              {/* Icon Circle with Purple Gradient */}
              <div 
                className="flex-shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: '56px',
                  height: '56px',
                  background: `linear-gradient(135deg, var(--color-icon-circle-start), var(--color-icon-circle-end))`
                }}
              >
                <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {category.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 
                  style={{
                    fontSize: 'var(--font-size-lg, 1.125rem)',
                    fontWeight: 'var(--font-weight-semibold, 600)',
                    color: 'var(--color-text-primary, #4C1D95)',
                    lineHeight: 'var(--line-height-tight, 1.25)',
                    margin: '0 0 0.25rem 0',
                    padding: 0
                  }}
                >
                  {category.name}
                </h3>
                <p 
                  style={{
                    fontSize: 'var(--font-size-sm, 0.875rem)',
                    color: 'var(--color-text-secondary, #6B7280)',
                    lineHeight: 'var(--line-height-normal, 1.5)',
                    margin: 0,
                    padding: 0
                  }}
                >
                  {category.description}
                </p>
              </div>
            </div>
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