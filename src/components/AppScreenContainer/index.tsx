import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import {
  AppScreenContainerStylesProps,
  FooterContainer,
  HeaderContainer,
  HeaderSpace,
  ScreenContainer,
} from "./styles";

interface AppScreenContainerProps extends AppScreenContainerStylesProps {
  header?: ReactNode;
  headerColor?: string;
  footer?: ReactNode;
  footerColor?: string;
}

export default function AppScreenContainer({
  header,
  headerColor,
  footer,
  footerColor,
  children,
}: AppScreenContainerProps) {
  return (
    <>
      <StatusBar style="inverted" />
      {header ? <HeaderContainer>{header}</HeaderContainer> : <HeaderSpace />}
      <ScreenContainer>{children}</ScreenContainer>
      {footer && (
        <FooterContainer color={footerColor}>{footer}</FooterContainer>
      )}
    </>
  );
}
