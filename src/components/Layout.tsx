import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-quran-green text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2 urdu-text">القرآن الکریم</h2>
          <p className="opacity-80">قرآن پاک کی تلاوت اور اردو ترجمہ</p>
          <div className="mt-4 pt-4 border-t border-white/20 text-sm opacity-60">
            &copy; {new Date().getFullYear()} القرآن الکریم - تمام حقوق محفوظ ہیں
          </div>
        </div>
      </footer>
    </div>
  );
}
