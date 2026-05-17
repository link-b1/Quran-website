import { Link, useLocation } from 'react-router-dom';
import { Book, Home, List, Search } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'ہوم', path: '/', icon: Home },
    { name: 'سورتیں', path: '/surahs', icon: List },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-quran-green/10">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 bg-gradient-to-br from-quran-green to-quran-green-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-quran-green/30 ring-2 ring-white/50">
            <Book size={26} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-quran-green-dark urdu-text leading-tight">
              القرآن الکریم
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold -mt-1 hidden sm:block">
              Guidance for Mankind
            </span>
          </div>
        </Link>

        <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-6 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300",
                  isActive 
                    ? "bg-white text-quran-green shadow-sm ring-1 ring-black/5" 
                    : "text-gray-500 hover:text-quran-green hover:bg-white/50"
                )}
              >
                <Icon size={20} className={cn("transition-transform", isActive && "scale-110")} />
                <span className="font-bold urdu-text">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
