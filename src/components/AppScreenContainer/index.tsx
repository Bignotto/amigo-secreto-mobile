import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import {
  AppScreenContainerStylesProps,
  HeaderContainer,
  HeaderSpace,
  ScreenContainer,
} from "./styles";

interface AppScreenContainerProps extends AppScreenContainerStylesProps {
  header?: ReactNode;
}

export default function AppScreenContainer({
  header,
  children,
}: AppScreenContainerProps) {
  return (
    <>
      <StatusBar style="inverted" />
      {header ? <HeaderContainer>{header}</HeaderContainer> : <HeaderSpace />}
      <ScreenContainer>{children}</ScreenContainer>
    </>
  );
}
