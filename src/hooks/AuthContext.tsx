import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import supabase from "@services/supabase";
import { ReactNode, createContext, useContext, useState } from "react";
import { useWarmUpBrowser } from "./warmUpBrowser";

type AppAuthProviderProps = {
  children: ReactNode;
};

type SessionData = {
  state: "authenticated" | "unauthenticated";
  isLoading: boolean;
  user?: {
    name: string;
    email: string;
  };
};

type AppAuthContextData = {
  appSignIn(): Promise<void>;
  appSignOut(): Promise<void>;
  isLoading: boolean;
  // session: SessionData
};

const AppAuthContext = createContext({} as AppAuthContextData);

function AppAuthProvider({ children }: AppAuthProviderProps) {
  useWarmUpBrowser();

  const [isLoading, setIsLoading] = useState(true);
  const [sessionStatus, setSessionStatus] = useState<
    "authenticated" | "unauthenticated"
  >("unauthenticated");

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { signOut } = useAuth();
  const { user } = useUser();

  async function loadUserProfile() {
    try {
      let { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", user?.primaryEmailAddress?.emailAddress);
      //NEXT: fix: detect if user already have a profile
      console.log(user?.primaryEmailAddress?.emailAddress);
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }

  async function appSignIn() {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        setSessionStatus("authenticated");
        await loadUserProfile();
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
      setSessionStatus("unauthenticated");
    } finally {
      setIsLoading(false);
    }
  }

  async function appSignOut() {
    try {
      signOut();
      setSessionStatus("unauthenticated");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppAuthContext.Provider
      value={{
        appSignIn,
        appSignOut,
        isLoading,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
}

function appUseAuth() {
  return useContext(AppAuthContext);
}

export { AppAuthProvider, appUseAuth };
