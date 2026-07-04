/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Calculator, 
  Dumbbell, 
  ChevronRight, 
  Info,
  Flame,
  ArrowRight
} from 'lucide-react';
import { FOOD_DATA } from './constants';
import { FoodItem } from './types';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFoodId, setSelectedFoodId] = useState<string>(FOOD_DATA[0].id);
  const [grams, setGrams] = useState<number>(100);

  const filteredFoods = useMemo(() => {
    return FOOD_DATA.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedFood = useMemo(() => {
    return FOOD_DATA.find(f => f.id === selectedFoodId) || FOOD_DATA[0];
  }, [selectedFoodId]);

  const calculatedProtein = useMemo(() => {
    return ((grams * selectedFood.protein) / 100).toFixed(1);
  }, [grams, selectedFood]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg text-white shadow-sm shadow-emerald-200">
              <Dumbbell size={20} />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">
              Protein<span className="text-emerald-600">App</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-600">
            <span className="text-emerald-600 border-b-2 border-emerald-500 pb-1">Cuntada</span>
            <span>Ku Saabsan</span>
            <span>Talooyin</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Explorer */}
          <div className="lg:col-span-7 space-y-6">
            <section>
              <div className="flex flex-col gap-2 mb-6">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Kalkuleetarka Protein-ka</h2>
                <p className="text-slate-500">Raadi cuntooyinka protein-ka badan oo xisaabi xaddiga aad u baahan tahay.</p>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Raadi hilib, ukun, badar..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-700 uppercase tracking-widest text-xs">Cuntooyinka la helay ({filteredFoods.length})</h3>
              </div>

              <div className="grid gap-3">
                <AnimatePresence mode='popLayout'>
                  {filteredFoods.map((food) => (
                    <motion.div
                      key={food.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedFoodId === food.id 
                          ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200' 
                          : 'bg-white border-slate-200 hover:border-emerald-200 hover:shadow-md hover:shadow-slate-200/50'
                      }`}
                      onClick={() => setSelectedFoodId(food.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl bg-slate-50 p-2 rounded-lg group-hover:bg-white transition-colors">
                          {food.emoji}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{food.name}</h4>
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{food.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <div>
                          <p className="text-lg font-black text-emerald-600 leading-none">{food.protein}g</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">per 100g</p>
                        </div>
                        <ChevronRight size={18} className={`transition-transform ${selectedFoodId === food.id ? 'translate-x-1 text-emerald-500' : 'text-slate-300'}`} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredFoods.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center space-y-3"
                  >
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <Search size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">Lama helin cunto waafaqsan raadintaada.</p>
                  </motion.div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Calculator Widget */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <motion.div 
                layout
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white overflow-hidden relative"
              >
                {/* Background decorative element */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                    <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg">
                      <Calculator size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-none">Xisaabiyaha</h3>
                      <p className="text-slate-500 text-xs mt-1">Xisaabi inta protein aad cunayso</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Garaamka (g)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={grams}
                          onChange={(e) => setGrams(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                        <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none text-slate-500 font-bold">
                          g
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedFood.emoji}</span>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Cuntada la doortay</p>
                          <p className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate max-w-[150px]">{selectedFood.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Base</p>
                        <p className="font-bold text-slate-200">{selectedFood.protein}g / 100g</p>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20" />
                        <div className="relative text-center">
                          <p className="text-6xl font-black text-emerald-400 tracking-tighter flex items-end justify-center gap-1">
                            {calculatedProtein}
                            <span className="text-xl text-emerald-600 mb-2">g</span>
                          </p>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Isbar-bardhigga Protein-ka</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-6">
                      Ku dar Liiskaaga
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>

              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex gap-4">
                <div className="text-emerald-600 shrink-0">
                  <Info size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-emerald-900">Ma ogeyd?</h4>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    Dadka qaan-gaarka ah waxay caadiyan u baahan yihiin <strong>0.8g - 1.2g</strong> oo protein ah halkii kiilo oo miisaankooda ah maalin kasta.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex gap-4">
                <div className="text-orange-600 shrink-0">
                  <Flame size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-orange-900">Dhisidda Muruqa</h4>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    Haddii aad tahay qof jimicsi sameeya, waxaad u baahan kartaa ilaa <strong>2.0g</strong> oo protein ah halkii kiilo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-slate-100 p-1.5 rounded text-slate-400">
              <Dumbbell size={16} />
            </div>
            <span className="font-bold text-slate-800 tracking-tight">Protein-ka Cuntada</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Waa app loogu talagalay in lagu caawiyo bulshada Soomaaliyeed si ay u fahmaan muhiimadda protein-ka iyo sidii ay u heli lahaayeen cunto isku dheelitiran.
          </p>
          <div className="text-xs text-slate-300 font-medium uppercase tracking-widest pt-4">
            &copy; 2024 ProteinApp. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
