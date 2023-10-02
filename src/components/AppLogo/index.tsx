import React from "react";
import {
  AppLogoContainer,
  AppLogoTextLG,
  AppLogoTextMD,
  AppLogoTextSM,
} from "./styles";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
};

export default function AppLogo({ size = "md" }: AppLogoProps) {
  return (
    <AppLogoContainer>
      {size === "lg" && <AppLogoTextLG>Amigo Secreto</AppLogoTextLG>}
      {size === "md" && <AppLogoTextMD>Amigo Secreto</AppLogoTextMD>}
      {size === "sm" && <AppLogoTextSM>Amigo Secreto</AppLogoTextSM>}
    </AppLogoContainer>
  );
}
