import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Info, MapPin } from 'lucide-react';
import { getAllSurahs, Surah } from '../services/quranService';
import { cn } from '../lib/utils';

export default function SurahList() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllSurahs();
        setSurahs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    s.number.toString().includes(search)
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <div className="h-10 w-64 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-6 w-48 bg-gray-50 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-50 h-32 rounded-3xl animate-pulse border border-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-20 bg-white">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-quran-green-dark mb-6 urdu-text"
        >
          فہرستِ سورتیں
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-500 urdu-text font-light"
        >
          تمام 114 سورتیں اردو ترجمعہ و تفسیر کے ساتھ
        </motion.p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-20 relative group">
        <div className="absolute inset-0 bg-quran-green/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-white p-2 rounded-[2rem] shadow-[0_15px_40px_-5px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center">
          <div className="p-4 bg-quran-green-light rounded-2xl text-quran-green">
            <Search size={22} />
          </div>
          <input 
            type="text" 
            placeholder="سورت تلاش کریں (نام یا نمبر)..."
            className="flex-grow px-4 py-4 bg-transparent outline-none urdu-text text-xl placeholder:text-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="p-3 text-gray-300 hover:text-gray-600 transition-colors"
            >
              <Info size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredSurahs.map((surah, idx) => (
          <Link 
            key={surah.number} 
            to={`/surah/${surah.number}`}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              whileHover={{ y: -8 }}
              className="relative p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:shadow-[0_40px_60px_-15px_rgba(0,132,61,0.1)] group-hover:border-quran-green/20"
            >
              {/* Surah Number Watermark */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gray-50 flex items-center justify-center rounded-3xl text-gray-200 font-bold text-3xl transition-colors group-hover:bg-quran-green-light group-hover:text-quran-green/20 pointer-events-none">
                {surah.number}
              </div>

              <div className="flex flex-col h-full gap-6">
                <div className="flex justify-between items-start">
                  <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-quran-green transition-colors">
                      {surah.revelationType}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="urdu-text text-sm font-medium text-gray-400">
                      آیات: {surah.numberOfAyahs}
                    </span>
                  </div>
                </div>

                <div className="flex-grow text-center flex flex-col items-center justify-center gap-2">
                  <h3 className="text-3xl font-bold text-gray-800 arabic-text leading-tight transition-colors group-hover:text-quran-green-dark">
                    {surah.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-400 group-hover:text-quran-green transition-colors">
                    {surah.englishName}
                  </p>
                </div>

                <div className="h-1 w-12 bg-gray-100 rounded-full mx-auto transition-all group-hover:w-24 group-hover:bg-quran-green" />
                
                <div className="flex justify-center">
                  <span className="text-xs font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    READ SURAH
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-40">
          <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-gray-300" />
          </div>
          <p className="text-2xl urdu-text text-gray-400">کوئی سورت نہیں ملی۔</p>
          <button 
            onClick={() => setSearch('')}
            className="mt-6 text-quran-green font-bold urdu-text hover:underline"
          >
            تلاش صاف کریں
          </button>
        </div>
      )}
    </div>
  );
}
