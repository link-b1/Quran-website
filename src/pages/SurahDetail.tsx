import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, Play, Share2, Bookmark } from 'lucide-react';
import { getSurahDetail, SurahDetail as ISurahDetail } from '../services/quranService';
import { cn } from '../lib/utils';

export default function SurahDetail() {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const [surah, setSurah] = useState<ISurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const surahNumber = parseInt(number || '1');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getSurahDetail(surahNumber);
        setSurah(data);
        window.scrollTo(0, 0);
      } catch (err) {
        setError('ڈیٹا لوڈ کرنے میں دشواری پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [surahNumber]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-48 text-center min-h-screen">
        <div className="w-20 h-20 border-4 border-quran-green border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-xl shadow-quran-green/10" />
        <p className="text-2xl urdu-text text-quran-green-dark animate-pulse">ذرا صبر کیجئے، سورت لوڈ ہو رہی ہے...</p>
      </div>
    );
  }

  if (error || !surah) {
    return (
      <div className="container mx-auto px-4 py-40 text-center min-h-screen">
        <div className="max-w-md mx-auto bg-red-50 p-10 rounded-[3rem] border border-red-100 shadow-xl shadow-red-500/5">
          <p className="text-2xl urdu-text text-red-600 mb-8 font-bold">{error || 'سورہ تلاش کرنے میں ناکامی'}</p>
          <Link to="/surahs" className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-3 rounded-2xl urdu-text font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
            <ArrowRight size={20} className="rotate-180" />
            <span>فہرست پر واپس جائیں</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-quran-green-light selection:text-quran-green-dark">
      {/* Reading Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-1.5 bg-gray-50 z-[60] pointer-events-none origin-right">
        <motion.div 
          className="h-full bg-gradient-to-r from-quran-green to-quran-green-dark" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      {/* Surah Header */}
      <div className="relative pt-20 pb-32 overflow-hidden bg-quran-green-dark">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full -translate-y-1/2 translate-x-1/3 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-quran-gold rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 mb-10 px-8 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-bold tracking-widest uppercase"
          >
            <span className="opacity-60">Surah</span> {surah.number}
            <span className="w-1.5 h-1.5 bg-quran-gold rounded-full" />
            <span>{surah.revelationType === 'Meccan' ? 'مکی سورت' : 'مدنی سورت'}</span>
            <span className="w-1.5 h-1.5 bg-quran-gold rounded-full" />
            <span className="urdu-text text-xs leading-none">{surah.numberOfAyahs} آیات</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-bold mb-8 arabic-text text-glow leading-normal"
          >
            {surah.name}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-2xl md:text-3xl urdu-text opacity-90 leading-relaxed font-light mb-4">
              {surah.englishNameTranslation}
            </p>
            <div className="h-1.5 w-32 bg-white/20 rounded-full mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="container mx-auto px-4 py-24 max-w-5xl">
        {/* Navigation Sidebar (Desktop) / Minimal header (Mobile) */}
        <div className="flex flex-col gap-24 relative">
          
          {/* Bismillah */}
          {surah.number !== 1 && surah.number !== 9 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 py-16 px-10 border-b border-gray-100"
            >
              <h2 className="text-5xl md:text-6xl arabic-text mb-8 text-quran-green-dark">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h2>
              <p className="text-2xl text-gray-400 urdu-text font-light tracking-wide">شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے</p>
            </motion.div>
          )}

          {/* Ayahs List */}
          <div className="space-y-32">
            {surah.ayahs.map((ayah, index) => (
              <motion.div 
                key={ayah.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                className="relative group pt-16"
              >
                {/* Ayah Indicator */}
                <div className="absolute top-0 right-0 flex items-center gap-4 translate-y--1/2 w-full">
                  <div className="flex-grow h-[1px] bg-gray-100 group-hover:bg-quran-green/20 transition-colors" />
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-300 hover:bg-quran-green-light hover:text-quran-green hover:border-quran-green/30 transition-all">
                      <Share2 size={16} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-300 hover:bg-quran-green-light hover:text-quran-green hover:border-quran-green/30 transition-all">
                      <Bookmark size={16} />
                    </button>
                    <div className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 font-bold text-sm tracking-widest group-hover:bg-quran-green group-hover:text-white group-hover:border-quran-green transition-all shadow-sm">
                      {ayah.numberInSurah}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-12 text-center md:text-right">
                  <div className="relative">
                    <p className="text-4xl md:text-6xl text-gray-800 leading-[2] arabic-text select-all px-4 group-hover:text-black transition-colors duration-500">
                      {index === 0 && ayah.text.startsWith('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ') && surah.number !== 1 
                        ? ayah.text.replace('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', '').trim() 
                        : ayah.text}
                    </p>
                  </div>
                  
                  <div className="max-w-4xl mx-auto md:mr-0 md:ml-auto">
                    <div className="p-8 md:p-12 bg-gray-50/50 rounded-[3rem] border border-transparent group-hover:bg-white group-hover:border-quran-green/5 group-hover:shadow-[0_40px_80px_-20px_rgba(0,132,61,0.08)] transition-all duration-700">
                      <p className="text-2xl md:text-3xl text-gray-600 urdu-text leading-[2.2] font-light text-center md:text-right">
                        {surah.urduAyahs[index].text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Navigation Footer */}
        <div className="mt-48 bg-white p-12 rounded-[4rem] border border-gray-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">
            
            {surahNumber > 1 ? (
              <Link 
                to={`/surah/${surahNumber - 1}`}
                className="group flex flex-col items-center md:items-start text-center md:text-right p-6 rounded-[2.5rem] hover:bg-quran-green-light transition-all"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-quran-green mb-2">پچھلی سورہ</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-quran-green group-hover:text-white group-hover:border-quran-green transition-all">
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 urdu-text group-hover:text-quran-green-dark transition-colors">گزشتہ</div>
                </div>
              </Link>
            ) : <div />}

            <div className="flex justify-center flex-col items-center gap-4">
              <Link 
                to="/surahs"
                className="w-20 h-20 flex items-center justify-center bg-quran-green-dark text-white rounded-[2rem] shadow-2xl shadow-quran-green/30 hover:scale-105 active:scale-95 transition-all text-glow"
                title="فہرستِ سورتیں"
              >
                <List size={32} />
              </Link>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">SURAH INDEX</span>
            </div>

            {surahNumber < 114 ? (
              <Link 
                to={`/surah/${surahNumber + 1}`}
                className="group flex flex-col items-center md:items-end text-center md:text-left p-6 rounded-[2.5rem] hover:bg-quran-green-light transition-all"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-quran-green mb-2">اگلی سورہ</div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-gray-800 urdu-text group-hover:text-quran-green-dark transition-colors">اگلی</div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-quran-green group-hover:text-white group-hover:border-quran-green transition-all">
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ) : <div />}

          </div>
        </div>
      </div>

      {/* Quick Action Button (Scroll to top) */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          "fixed bottom-10 left-10 w-16 h-16 bg-white border border-gray-100 shadow-2xl rounded-3xl flex items-center justify-center text-quran-green transition-all duration-500 z-50 hover:bg-quran-green hover:text-white",
          scrollProgress > 20 ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
      >
        <ArrowRight size={24} className="rotate-90" />
      </button>
    </div>
  );
}
