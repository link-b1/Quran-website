/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SurahList from './pages/SurahList';
import SurahDetail from './pages/SurahDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="surahs" element={<SurahList />} />
          <Route path="surah/:number" element={<SurahDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

