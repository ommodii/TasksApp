import React from 'react';
import CyberpunkBackground from './CyberpunkBackground';
import { JETBLACK_THEME } from '../styles/themes';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signUpNewUser({ email, password });
            if (result.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const themeStyles = {
        '--color-brand-bg': JETBLACK_THEME.colors.background,
        '--color-brand-card': JETBLACK_THEME.colors.card,
        '--color-brand-border': JETBLACK_THEME.colors.border,
        '--color-silver-bright': JETBLACK_THEME.colors.silver.bright,
        '--color-silver-mid': JETBLACK_THEME.colors.silver.mid,
        '--color-silver-dark': JETBLACK_THEME.colors.silver.dark,
        '--color-success': JETBLACK_THEME.colors.success,
        '--color-error': JETBLACK_THEME.colors.error,
        '--scanline-opacity': JETBLACK_THEME.opacity.scanline,
        '--border-heavy': JETBLACK_THEME.borders.heavy,
        '--border-standard': JETBLACK_THEME.borders.standard,
    } as React.CSSProperties;



    return (
        <div style={themeStyles} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-bg text-silver-bright font-mono selection:bg-silver-mid selection:text-black">
            {/* Background Engine */}
            <div className="absolute inset-0 z-0">
                <CyberpunkBackground />
                {/* Semi-transparent overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Floating Module / Data Entry Terminal */}
            <div className="relative z-10 w-full max-w-md p-8 border border-brand-border bg-brand-card shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-sm">

                {/* Header */}
                <div className="mb-8 text-center border-b border-brand-border pb-4">
                    <h2 className="text-3xl font-bold uppercase tracking-widest italic" style={{ color: 'var(--color-silver-bright)' }}>
                        System_Registration
                    </h2>
                    <p className="text-sm tracking-wider opacity-70 mt-2 uppercase text-[var(--color-silver-mid)]">
                        [INITIATE_NEW_USER_PROTOCOL]
                    </p>
                </div>

                <form onSubmit={handleSignUp} className="flex flex-col gap-6">

                    {/* Email Input */}
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest mb-1 text-silver-dark group-focus-within:text-silver-bright transition-colors">
                            User_ID / Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-brand-border p-3 text-sm focus:outline-none focus:border-silver-mid transition-all placeholder-silver-dark"
                            type="email"
                            placeholder="CONFIGURE_EMAIL"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest mb-1 text-[var(--color-silver-dark)] group-focus-within:text-[var(--color-silver-bright)] transition-colors">
                            Access_Code / Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-brand-border p-3 text-sm focus:outline-none focus:border-silver-mid transition-all placeholder-silver-dark"
                            type="password"
                            placeholder="CONFIGURE_PASSWORD"
                        />
                    </div>

                    {/* Execute Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full bg-[var(--color-brand-border)] text-[var(--color-silver-bright)] py-3 px-4 border border-[var(--color-silver-dark)] uppercase tracking-widest font-bold hover:bg-[var(--color-silver-bright)] hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'PROCESSING...' : 'INITIALIZE_ACCOUNT'}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 border border-[var(--color-error)] bg-red-900/10 p-3 text-center">
                            <p className="text-xs text-[var(--color-error)] uppercase tracking-wide font-bold">
                                [SYSTEM_ALERT]: {error}
                            </p>
                        </div>
                    )}
                </form>

                {/* Footer Links */}
                <div className="mt-8 text-center border-t border-[var(--color-brand-border)] pt-4">
                    <p className="text-xs uppercase text-[var(--color-silver-dark)]">
                        Identity_Established?{' '}
                        <Link to="/signin" className="text-[var(--color-success)] hover:underline decoration-1 underline-offset-4 font-bold ml-1">
                            &lt;ACCESS_LOGIN /&gt;
                        </Link>
                    </p>
                </div>
            </div>

            {/* Scanline Effect (Optional) */}
            <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-[var(--scanline-opacity)]"></div>
        </div>
    )
};

export default SignUp;