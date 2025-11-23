import { useState, useEffect, type ReactElement } from 'react';
import { motion } from 'motion/react';
import { Heart, DollarSign, Users, Home, Sparkles, Target, ArrowLeft } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  gradient: string;
  icon: ReactElement;
}

const categories: Category[] = [
  {
    id: 'loyalty',
    name: 'Loyalty',
    gradient: 'from-purple-500 via-pink-500 to-rose-400',
    icon: <Heart className="w-6 h-6" />
  },
  {
    id: 'boundaries',
    name: 'Boundaries',
    gradient: 'from-teal-400 via-cyan-500 to-blue-500',
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 'money',
    name: 'Money',
    gradient: 'from-green-400 via-emerald-500 to-teal-500',
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    id: 'intimacy',
    name: 'Intimacy',
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-500',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'family',
    name: 'Family',
    gradient: 'from-amber-400 via-orange-500 to-red-400',
    icon: <Home className="w-6 h-6" />
  },
  {
    id: 'ambition',
    name: 'Ambition',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    icon: <Users className="w-6 h-6" />
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
    <div className="h-full flex flex-col px-6 pb-8 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />
      
      {/* Header section with back button and title */}
      <div className="relative z-20 pt-14 pb-6">
        {/* Back button - in its own row */}
        {onBack && (
          <div className="mb-4">
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
        )}
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <h1 className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent mb-3">
          What do you want to explore?
        </h1>
        <p className="text-gray-400 mb-8">
          Pick categories you're curious about
        </p>
      </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto relative z-10">
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
            whileHover={{ scale: 1.02 }}
            onClick={() => toggleCategory(category.id)}
            className={`relative h-36 rounded-3xl overflow-hidden transition-all duration-300 ${
              selected.includes(category.id) 
                ? 'ring-2 ring-white/40 shadow-xl shadow-white/20' 
                : 'shadow-lg'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
            
            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            
            {selected.includes(category.id) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/10 backdrop-blur-sm"
              />
            )}
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <div className="mb-2 opacity-90">
                {category.icon}
              </div>
              <span className="tracking-wide">
                {category.name}
              </span>
            </div>

            {selected.includes(category.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
              </motion.div>
            )}
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
        className={`relative mt-6 w-full h-14 rounded-full overflow-hidden transition-all duration-300 z-10 ${
          selected.length === 0 
            ? 'opacity-40 cursor-not-allowed' 
            : 'shadow-lg shadow-purple-500/30'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400" />
        <div className="absolute inset-0 flex items-center justify-center text-white tracking-wide">
          Continue
        </div>
      </motion.button>
    </div>
  );
}