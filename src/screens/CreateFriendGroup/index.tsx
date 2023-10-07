import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { FormContainer, LogoWrapper } from "./styles";

export default function CreateFriendGroup() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <AppScreenContainer>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoWrapper>
          <AppLogo />
        </LogoWrapper>
        <AppSpacer verticalSpace="md" />
        <AppText size="xlg">Criar um grupo novo</AppText>
        <AppText>
          Preencha as informações abaixo para criar um novo grupo de Amigo
          Secreto.
        </AppText>
        <AppSpacer verticalSpace="xlg" />
        <FormContainer>
          <AppInput
            label="Qual vai ser o nome do grupo?"
            placeholder="Grupo da Firma"
          />
          <AppSpacer verticalSpace="md" />
          <AppInput
            label="Quando vai ser a revelação?"
            placeholder="23/12/2023"
          />
          <AppSpacer verticalSpace="md" />
          <AppInput label="Em qual horário?" placeholder="Após o expediente" />
          <AppSpacer verticalSpace="md" />
          <AppInput label="Onde vai ser a festa?" placeholder="Refeitório" />
          <AppSpacer verticalSpace="md" />
          <AppInput label="Qual o valor dos presentes?" placeholder="200" />
          <AppSpacer verticalSpace="md" />
          <AppInput
            label="Crie uma senha fácil para seus amigos poderem entrar no grupo"
            placeholder="Senha fácil"
          />
          <AppSpacer verticalSpace="lg" />
          <AppButton title="Criar grupo!" variant="positive" />
          <AppSpacer verticalSpace="sm" />
          <AppButton
            onPress={() => navigation.goBack()}
            title="Cancelar"
            variant="negative"
          />
          <AppSpacer verticalSpace="xlg" />
        </FormContainer>
      </ScrollView>
    </AppScreenContainer>
  );
}
