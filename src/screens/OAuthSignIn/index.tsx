import { useOAuth } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useWarmUpBrowser } from "@hooks/warmUpBrowser";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export default function OAuthSignIn() {
  useWarmUpBrowser();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  async function appSignIn() {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigation.goBack();
      }
    } catch (err) {
      console.error("OAuth error", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppScreenContainer>
      <AppText>Login com google</AppText>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <AppButton title="Google login" onPress={appSignIn} />
      )}
    </AppScreenContainer>
  );
}
