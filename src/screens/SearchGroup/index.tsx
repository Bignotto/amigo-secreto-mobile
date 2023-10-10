import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import Header from "@components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { IconWrapper, InputComponent, SearchInputContainer } from "./styles";

export default function SearchGroup() {
  //NEXT: search database for groups
  return (
    <AppScreenContainer>
      <Header />
      <AppSpacer verticalSpace="xlg" />
      <SearchInputContainer>
        <InputComponent />
        <IconWrapper>
          <FontAwesome5 name="search" size={24} color="black" />
        </IconWrapper>
      </SearchInputContainer>
    </AppScreenContainer>
  );
}
