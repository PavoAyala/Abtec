'use client';
import { useState, Suspense } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // If redirected here with error query parameter
  const queryError = searchParams.get('error');

  const getFriendlyErrorMessage = (errorObj: unknown): string => {
    const err = errorObj as Record<string, unknown>;
    let code = '';
    if (typeof err?.code === 'string') {
      code = err.code;
    } else if (typeof err?.message === 'string') {
      code = err.message;
    }
    if (code.includes('auth/popup-closed-by-user')) return 'El proceso de Google fue cancelado o la ventana se cerró.';
    if (code.includes('auth/invalid-credential')) return 'El correo o la contraseña son incorrectos.';
    if (code.includes('auth/user-not-found') || code.includes('auth/wrong-password')) return 'El correo o la contraseña son incorrectos.';
    if (code.includes('auth/network-request-failed')) return 'Error de conexión. Revisa tu internet e intenta de nuevo.';
    if (code.includes('Access Denied')) return 'Acceso denegado: cuenta no autorizada en el CRM.';
    return 'Ocurrió un error inesperado al iniciar sesión. Inténtalo de nuevo.';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify if user is in 'staff' collection. AuthProvider handles the redirect 
      // if valid, but we should handle error display early.
      const staffRef = doc(db, 'staff', userCredential.user.uid);
      const staffSnap = await getDoc(staffRef);
      
      if (!staffSnap.exists()) {
        throw new Error('Access Denied: You do not have staff privileges.');
      }

      router.push('/');
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
      // Ensure they don't remain logged in locally as standard user
      await auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const staffRef = doc(db, 'staff', userCredential.user.uid);
      const staffSnap = await getDoc(staffRef);
      
      if (!staffSnap.exists()) {
        throw new Error('Access Denied: Authorized staff account not found for this Google email.');
      }
      
      router.push('/');
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
      await auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-(--accent) text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          A
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Abtec CRM</h1>
        <p className="text-gray-500 mt-2">Acceso de Personal Autorizado</p>
      </div>

      {(error || queryError === 'not_staff') && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex gap-2">
          <span>⚠️</span>
          <p>{error || 'Acceso denegado: esta cuenta no pertenece al personal interno.'}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="crm-email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            id="crm-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--accent) outline-none transition-all"
            placeholder="admin@abtec.com"
          />
        </div>
        <div>
          <label htmlFor="crm-password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            id="crm-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-(--accent) outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-(--accent) hover:bg-[#1a4a42] text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-6 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
        <span className="mx-4 text-xs text-gray-400 font-medium uppercase">o acceso rápido con</span>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full mt-6 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 flex items-center justify-center gap-3 rounded-xl transition-colors disabled:opacity-70"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google logo" />
        <span>Cuenta de Google</span>
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex text-left items-center justify-center bg-gray-50 p-4">
      <Suspense fallback={<div>Cargando entorno seguro...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
