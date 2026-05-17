export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  audio?: string;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
  urduAyahs: Ayah[];
}

const BASE_URL = 'https://api.alquran.cloud/v1';

export async function getAllSurahs(): Promise<Surah[]> {
  const response = await fetch(`${BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
}

export async function getSurahDetail(number: number): Promise<SurahDetail> {
  // Fetch Arabic and Urdu editions
  const response = await fetch(`${BASE_URL}/surah/${number}/editions/quran-simple,ur.jandal`);
  const data = await response.json();
  
  const arabicEdition = data.data[0];
  const urduEdition = data.data[1];

  return {
    ...arabicEdition,
    ayahs: arabicEdition.ayahs,
    urduAyahs: urduEdition.ayahs,
  };
}

// Urdu translations for surah names (as the API returns English translations)
export const surahUrduNames: Record<number, string> = {
  1: "الفاتحہ", 2: "البقرہ", 3: "آل عمران", 4: "النساء", 5: "المائدہ",
  6: "الانعام", 7: "الاعراف", 8: "الانفال", 9: "التوبہ", 10: "یونس",
  // ... this list is long, I'll provide a mapping or use a different API if needed, 
  // but alquran.cloud returns Arabic names. I'll use those as primary.
};
