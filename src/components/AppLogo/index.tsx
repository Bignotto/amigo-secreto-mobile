import React from "react";
import {
  AppLogoContainer,
  AppLogoTextLG,
  AppLogoTextMD,
  AppLogoTextSM,
} from "./styles";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "positive" | "negative";
};

export default function AppLogo({ size = "md", color }: AppLogoProps) {
  return (
    <AppLogoContainer>
      {size === "lg" && <AppLogoTextLG>Amigo Secreto</AppLogoTextLG>}
      {size === "md" && <AppLogoTextMD>Amigo Secreto</AppLogoTextMD>}
      {size === "sm" && <AppLogoTextSM>Amigo Secreto</AppLogoTextSM>}
    </AppLogoContainer>
  );
}
