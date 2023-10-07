import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import React from "react";

export default function CreateFriendGroup() {
  return (
    <AppScreenContainer>
      <Header />
      <AppLogo />
      <AppText>Criar um grupo de Amigo Secreto</AppText>
      <AppText>
        Preencha as informações abaixo para criar um novo grupo de Amigo
        Secreto.
      </AppText>
    </AppScreenContainer>
  );
}
