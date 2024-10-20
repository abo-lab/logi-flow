"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          {t('welcome')} <span className="text-blue-600">LogiFlow</span>
        </h1>
        <p className="mt-3 text-2xl">
          {t('description')}
        </p>
        <div className="flex mt-6">
          <Link href="/login" passHref>
            <Button className="mr-4">{t('login')}</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="outline">{t('signup')}</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}