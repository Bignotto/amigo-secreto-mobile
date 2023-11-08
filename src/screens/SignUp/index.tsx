import { useOAuth } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import { useWarmUpBrowser } from "@hooks/warmUpBrowser";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "./styles";

export default function SignUp() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [isLoading, setIsLoading] = useState(false);

  async function appSignIn() {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppScreenContainer>
      <Container>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <AppLogo size="lg" />
            <AppButton
              title="Entre com Google"
              onPress={appSignIn}
              isLoading={isLoading}
            />
          </>
        )}
      </Container>
    </AppScreenContainer>
  );
}
