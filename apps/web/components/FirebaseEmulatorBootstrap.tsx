'use client';

import { useEffect } from 'react';
import { getClientAuth } from '../lib/firebase';

export default function FirebaseEmulatorBootstrap() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true') {
      getClientAuth();
    }
  }, []);

  return null;
}
