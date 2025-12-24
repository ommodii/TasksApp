import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from '../lib/supabase';

const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<any>(undefined)

    // Sign Up
    const signUpNewUser = async ({ email, password }: { email: string, password: string }) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            console.error(error.message)
            return { success: false, error }
        }
        return { success: true, data }
    };

    // Sign In
    const signInUser = async ({ email, password }: { email: string, password: string }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {
                console.error(error)
                return { success: false, error: error.message }
            }
            console.log("success");
            return { success: true, data }
        } catch (error) {
            console.error(error)
            return { success: false, error }
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    // Sign Out

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
            return { success: false, error }
        }
    }

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signOut, signInUser }}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}