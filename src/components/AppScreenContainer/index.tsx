import React, { ReactNode } from "react";
import {
  AppScreenContainerStylesProps,
  HeaderContainer,
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
      {header && <HeaderContainer>{header}</HeaderContainer>}
      <ScreenContainer>{children}</ScreenContainer>
    </>
  );
}
