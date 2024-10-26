import { useSignUp, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import { useNavigation, useRoute } from "@react-navigation/native";
import supabase from "@services/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components";
import { LogoWrapper } from "./styles";

type NewAccountParams = {
  email: string;
};

export default function NewAccount() {
  const route = useRoute();
  const { email } = route.params as NewAccountParams;

  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const navigation = useNavigation();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  async function checkEmail() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email.trim().toLowerCase());
    if (error) {
      Alert.alert("Algo deu errado. Tente novamente em alguns minutos.");
      navigation.goBack();
    }

    if (data![0]) {
      Alert.alert("Já existe uma conta usando este e-mail.");
      navigation.goBack();
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkEmail();
  }, []);

  async function handleCreateAccount() {
    if (password.length === 0 || confirmation.length === 0) {
      Alert.alert("Informe uma senha válida.");
      return;
    }
    if (password !== confirmation) {
      Alert.alert("As senhas são diferentes.");
      return;
    }
    if (!isLoaded) {
      return;
    }

    try {
      const created = await signUp.create({
        emailAddress: email,
        password,
      });

      await setActive({ session: created.createdSessionId });
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      Alert.alert(error.errors[0].message);
      return;
    }
  }

  return (
    <AppScreenContainer
      header={
        <>
          <LogoWrapper>
            <AppLogo size="sm" color={theme.colors.white} />
          </LogoWrapper>
          <AppSpacer verticalSpace="xlg" />
          <AppText size="xxlg" color={theme.colors.white} bold>
            Nova conta
          </AppText>
        </>
      }
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <AppSpacer verticalSpace="lg" />
          <AppText>
            Preencha as informações abaixo para criar sua conta usando o e-mail:{" "}
            {email.toLowerCase()}
          </AppText>
          <AppSpacer verticalSpace="lg" />

          <AppSpacer verticalSpace="lg" />
          <AppInput
            label="Senha:"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <AppSpacer verticalSpace="sm" />
          <AppInput
            label="Confirme sua senha:"
            secureTextEntry={true}
            value={confirmation}
            onChangeText={(text) => setConfirmation(text)}
          />
          <AppSpacer verticalSpace="xlg" />
          <AppButton
            title="Criar conta"
            variant="positive"
            onPress={handleCreateAccount}
          />
          <AppSpacer verticalSpace="sm" />
          <AppButton
            title="Cancelar"
            variant="negative"
            onPress={() => navigation.goBack()}
          />
        </>
      )}
    </AppScreenContainer>
  );
}
