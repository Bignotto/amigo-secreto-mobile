import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { AntDesign } from "@expo/vector-icons";
import { useWarmUpBrowser } from "@hooks/warmUpBrowser";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GuestParamList } from "@routes/Navigation.types";
import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components";
import validator from "validator";
import { Container, ContentWrapper, LoginFormContainer } from "./styles";

export default function SignUp() {
  useWarmUpBrowser();

  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<GuestParamList>>();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logingIn, setLogingIn] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  function handleNewAccount() {
    if (email.length === 0) {
      Alert.alert("Informe seu email.");
      return;
    }

    if (!validator.isEmail(email)) {
      Alert.alert("E-Mail inválido.");
      return;
    }

    navigation.navigate("NewAccount", { email });
  }

  async function handleLogin() {
    if (loginEmail.length === 0) {
      Alert.alert("Preencha o seu e-mail");
      return;
    }

    if (loginPassword.length === 0) {
      Alert.alert("Preencha a sua senha");
      return;
    }

    if (!isLoaded) {
      return;
    }
    setLogingIn(true);

    try {
      const signedIn = await signIn.create({
        identifier: loginEmail,
        password: loginPassword,
      });

      if (signedIn.status !== "complete") {
        console.log(JSON.stringify(signedIn, null, 2));
      }

      if (signedIn.status === "complete") {
        await setActive({ session: signedIn.createdSessionId });
      }
      setLogingIn(false);
    } catch (error: any) {
      // console.error(JSON.stringify(error, null, 2));
      if (error.errors[0].code === "form_password_incorrect") {
        Alert.alert("E-mail ou senha inválidos. Tente novamente.");
      }
    }
  }

  return (
    <AppScreenContainer>
      <Container>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <AppLogo size="lg" color={theme.colors.primary} />
            <ContentWrapper>
              <AppInput
                keyboardType="email-address"
                label="Crie uma conta com seu e-mail:"
                placeholder="nome@email.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <AppSpacer verticalSpace="sm" />
              <AppButton title="Criar conta" onPress={handleNewAccount} />
              <AppSpacer verticalSpace="xlg" />
              <AppText>Ou entre com:</AppText>
              <LoginFormContainer>
                <AppInput
                  keyboardType="email-address"
                  placeholder="e-mail"
                  value={loginEmail}
                  onChangeText={(text) => setLoginEmail(text)}
                />
                <AppSpacer verticalSpace="sm" />
                <AppInput
                  placeholder="senha"
                  secureTextEntry={true}
                  value={loginPassword}
                  onChangeText={(text) => setLoginPassword(text)}
                />
                <AppSpacer verticalSpace="sm" />
                <AppButton
                  title="Login"
                  outline
                  onPress={handleLogin}
                  isLoading={logingIn}
                />
              </LoginFormContainer>
              <AppSpacer verticalSpace="xlg" />
              <AppButton
                title="Google"
                onPress={appSignIn}
                isLoading={isLoading}
                leftIcon={
                  <AntDesign
                    name="google"
                    size={24}
                    color={theme.colors.white}
                  />
                }
              />
            </ContentWrapper>
          </>
        )}
      </Container>
    </AppScreenContainer>
  );
}
