import AppButton from "@components/AppButton";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { appUseAuth } from "@hooks/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export default function OAuthSignIn() {
  const navigation = useNavigation();

  const { appSignIn } = appUseAuth();

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    await appSignIn();

    setIsLoading(false);
    navigation.goBack();
  }

  return (
    <AppScreenContainer>
      <AppText>Login com google</AppText>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <AppButton title="Google login" onPress={handleLogin} />
      )}
    </AppScreenContainer>
  );
}
