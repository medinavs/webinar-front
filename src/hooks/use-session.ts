import { betterAuthClient, Session, User } from "@/instances/auth/auth";
import { useEffect, useState } from "react";

interface UseSessionReturn {
    data: Session | null;
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    isAuthenticated: boolean;
    signOut: () => Promise<void>;
    refresh: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
    const [data, setData] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSession = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const { data: session, error: sessionError } = await betterAuthClient.getSession();

            if (sessionError) {
                throw new Error(sessionError.message || 'Failed to get session');
            }

            setData(session);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
            setData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        try {
            await betterAuthClient.signOut();
            setData(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to sign out'));
        }
    };

    const refresh = async () => {
        await fetchSession();
    };

    useEffect(() => {
        fetchSession();
    }, []);

    return {
        data,
        user: data?.user || null,
        isLoading,
        error,
        isAuthenticated: !!data?.user,
        signOut,
        refresh,
    };
}