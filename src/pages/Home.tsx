import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    { 
      title: 'سورتوں کی فہرست', 
      desc: 'تمام 114 سورتیں اردو نام اور ترجمہ کے ساتھ ایک خوبصورت ترتیب میں ملاحظہ کریں۔', 
      icon: ListIcon,
      link: '/surahs'
    },
    { 
      title: 'آسان تلاوت', 
      desc: 'آیات کا بہترین ڈیزائن جو پڑھنے میں آسانی اور سکون فراہم کرتا ہے۔', 
      icon: BookOpen
    },
    { 
      title: 'ہدایت کا نور', 
      desc: 'اپنی زندگی کو قرآن کے احکامات اور تعلیمات کے مطابق ڈھالنے کا عزم کریں۔', 
      icon: Heart 
    }
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/quran_hero_bg_1779011462517.png" 
            alt="Quran Background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-quran-green-dark/80 to-quran-green-dark" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block mb-8 p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <span className="px-5 py-1.5 bg-quran-green rounded-xl text-xs font-bold uppercase tracking-widest">
                The Noble Quran
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 arabic-text leading-[1.3] text-glow">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </h1>
            
            <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto urdu-text opacity-90 leading-relaxed font-light">
              شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/surahs"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-white text-quran-green-dark px-10 py-5 rounded-2xl text-2xl font-bold transition-all hover:bg-quran-green-light hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95"
              >
                <BookOpen size={28} className="transition-transform group-hover:rotate-12" />
                <span className="urdu-text">قرآن پڑھیں</span>
              </Link>
              
              <Link 
                to="/surahs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-xl font-bold border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <span className="urdu-text">سورتیں دیکھیں</span>
                <ArrowLeft size={20} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements for visual depth */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-quran-green/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-quran-gold/10 rounded-full blur-[150px] animate-pulse delay-700" />
      </section>

      {/* Stats/Brief info bar */}
      <section className="relative z-20 -mt-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 flex flex-wrap justify-around items-center gap-8 text-center">
            {[
              { label: 'سورتیں', val: '114' },
              { label: 'جزء', val: '30' },
              { label: 'آیات', val: '6,236' },
              { label: 'منازل', val: '7' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-quran-green-dark mb-1">{stat.val}</span>
                <span className="text-sm text-gray-400 font-medium urdu-text">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-quran-green-dark mb-8 urdu-text"
            >
              کتابِ ہدایت
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl leading-relaxed text-gray-600 urdu-text font-light"
            >
              قرآن مجید اللہ تعالیٰ کی آخری کتاب ہے جو تمام انسانیت کے لیے مشعلِ راہ ہے۔ اس ویب سائٹ کا مقصد تلاوتِ کلام پاک کو آپ کے لیے سہل بنانا ہے تاکہ آپ اس کے معنی اور پیغام کو گہرائی سے سمجھ سکیں اور اپنی زندگی میں انقلاب لا سکیں۔
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-quran-green-light/50 p-10 rounded-[3rem] border border-quran-green/5 text-center overflow-hidden transition-all hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,132,61,0.15)] hover:border-quran-green/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-quran-green/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-quran-green to-quran-green-dark rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-quran-green/20 rotate-3 group-hover:rotate-0 transition-transform">
                  {feature.icon && <feature.icon size={40} />}
                </div>
                
                <h3 className="relative z-10 text-3xl font-bold mb-6 text-quran-green-dark urdu-text">{feature.title}</h3>
                <p className="relative z-10 text-gray-500 urdu-text text-lg leading-relaxed">{feature.desc}</p>
                
                {feature.link && (
                  <Link 
                    to={feature.link} 
                    className="relative z-10 mt-8 inline-flex items-center gap-2 text-quran-green font-bold group/btn"
                  >
                    <span className="urdu-text text-xl">دریافت کریں</span>
                    <ArrowLeft size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-quran-green) 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-quran-green">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-8 urdu-text leading-tight">آج ہی تلاوت شروع کریں</h2>
            <p className="text-xl mb-12 urdu-text opacity-80">
              اللہ کا کلام پڑھنا دلوں کو سکون اور روح کو پاکیزگی بخشتا ہے۔
            </p>
            <Link 
              to="/surahs"
              className="inline-block bg-white text-quran-green px-12 py-5 rounded-2xl text-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              <span className="urdu-text">فہرستِ سورتیں</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ListIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}
