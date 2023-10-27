import React from "react";
import { AppLogoContainer, AppLogoStyleProps, AppLogoText } from "./styles";

export default function AppLogo({ ...rest }: AppLogoStyleProps) {
  return (
    <AppLogoContainer>
      <AppLogoText {...rest}>Amigo Secreto</AppLogoText>
    </AppLogoContainer>
  );
}
