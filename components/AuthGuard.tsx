'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('authed');
    if (authStatus === 'true') {
      setIsAuthed(true);
    } else {
      setIsAuthed(false);
      // Redirect to login page if trying to access any protected page
      if (pathname !== '/') {
        router.push('/');
      }
    }
  }, [router, pathname]);

  // While checking authentication status
  if (isAuthed === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fdfaf2] text-[#5c4033] p-6">
        <div className="text-center font-serif">
          <div className="inline-block w-8 h-8 border-4 border-[#8b5a2b] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl italic font-medium font-serif animate-pulse">Unfolding notes...</p>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  if (isAuthed) {
    return <>{children}</>;
  }

  // Redirecting, render nothing or brief notice
  return null;
}
