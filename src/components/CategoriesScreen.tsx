import { useState, useEffect, type ReactElement } from 'react';
import { motion } from 'motion/react';
import { Heart, Lock, Shield, DollarSign, ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: ReactElement;
  iconColor: string;
  accentVar: string;
}

const categories: Category[] = [
  {
    id: 'relationship-dynamics',
    name: 'Relationship Dynamics',
    icon: <Heart className="w-6 h-6" />,
    iconColor: '#EF4444', // Red
    accentVar: '--color-pastel-blush'
  },
  {
    id: 'loyalty',
    name: 'Loyalty & Jealousy',
    icon: <Lock className="w-6 h-6" />,
    iconColor: '#F59E0B', // Orange
    accentVar: '--color-pastel-citrus'
  },
  {
    id: 'boundaries',
    name: 'Boundaries & Privacy',
    icon: <Shield className="w-6 h-6" />,
    iconColor: '#3B82F6', // Blue
    accentVar: '--color-pastel-sky'
  },
  {
    id: 'money',
    name: 'Money & Power',
    icon: <DollarSign className="w-6 h-6" />,
    iconColor: '#10B981', // Green
    accentVar: '--color-pastel-mint'
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
              fontSize: 'var(--font-size-3xl, 1.875rem)',
              fontWeight: 'var(--font-weight-bold, 700)',
              color: 'var(--color-text-display, #2F2A1F)',
              lineHeight: 'var(--line-height-tight, 1.25)',
              margin: '0 0 0.5rem 0',
              padding: 0,
              fontFamily: 'var(--font-family-display, "Playfair Display", serif)'
            }}
          >
            Categories
          </h1>
          <p 
            style={{ 
              fontSize: 'var(--font-size-base, 1rem)',
              color: 'var(--color-text-secondary, #6B7280)',
              lineHeight: 'var(--line-height-normal, 1.5)',
              margin: '0 0 1.5rem 0',
              padding: 0
            }}
          >
            Choose a category to explore scenarios
          </p>
        </motion.div>
      </div>

      {/* Funny Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 mb-6"
      >
        <div
          style={{
            backgroundColor: 'var(--color-surface-ivory)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-lg)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border-soft)'
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-sm, 0.875rem)',
              color: 'var(--color-text-display, #2F2A1F)',
              lineHeight: 'var(--line-height-relaxed, 1.6)',
              margin: '0 0 0.5rem 0',
              padding: 0,
              fontStyle: 'italic',
              textAlign: 'center'
            }}
          >
            "The best way to test your partner? Go through these scenarios together and see what happens."
          </p>
          <p
            style={{
              fontSize: 'var(--font-size-xs, 0.75rem)',
              color: 'var(--color-text-secondary, #6B7280)',
              lineHeight: 'var(--line-height-normal, 1.5)',
              margin: 0,
              padding: 0,
              textAlign: 'center',
              fontWeight: 'var(--font-weight-medium, 500)'
            }}
          >
            — Mama Taylor
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 relative z-10 mb-6">
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
            className="relative transition-all duration-300 flex flex-col items-center text-center"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-lg)',
              boxShadow: selected.includes(category.id)
                ? 'var(--shadow-soft-elevated)'
                : 'var(--shadow-md)',
              border: selected.includes(category.id)
                ? '1.5px solid var(--color-icon-circle-start)'
                : '1px solid var(--color-border-soft)',
              gap: 'var(--spacing-md)'
            }}
            aria-pressed={selected.includes(category.id)}
          >
            {/* Icon + Accent Surface */}
            <div
              style={{
                width: '100%',
                minHeight: '130px',
                borderRadius: 'calc(var(--radius-xl) * 0.9)',
                backgroundColor: `var(${category.accentVar})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-full)',
                  background: `linear-gradient(135deg, ${category.iconColor}, var(--color-card-bg))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-button-text, #FFFFFF)',
                  boxShadow: 'var(--shadow-orb)'
                }}
              >
                {category.icon}
              </div>
            </div>

            {/* Category Name */}
            <span
              style={{
                fontSize: 'var(--font-size-base, 1rem)',
                fontWeight: 'var(--font-weight-semibold, 600)',
                color: 'var(--color-text-display, #2F2A1F)',
                lineHeight: 'var(--line-height-tight, 1.25)',
                textAlign: 'center',
                padding: 0,
                margin: 0
              }}
            >
              {category.name}
            </span>

            {/* Faux Add Control */}
            <div
              style={{
                width: '100%',
                borderRadius: 'var(--radius-full)',
                border: selected.includes(category.id)
                  ? '1px solid var(--color-icon-circle-start)'
                  : '1px solid var(--color-border-soft)',
                padding: '0.65rem',
                backgroundColor: 'var(--color-surface-ivory)',
                color: selected.includes(category.id)
                  ? 'var(--color-icon-circle-start)'
                  : 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm, 0.875rem)',
                fontWeight: 'var(--font-weight-medium, 500)'
              }}
            >
              + Add
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