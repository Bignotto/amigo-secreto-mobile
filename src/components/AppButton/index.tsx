import AppText from "@components/AppText";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { ButtonContainer, ButtonWrapper } from "./styles";

type AppButtonProps = RectButtonProps & {
  title: string;
  variant?: "positive" | "solid" | "negative";
  isLoading?: boolean;
  size?: "lg" | "md" | "sm";
};

export default function AppButton({
  title,
  variant = "solid",
  isLoading = false,
  size = "md",
  ...rest
}: AppButtonProps) {
  const theme = useTheme();

  const buttonCollor =
    variant === "positive"
      ? theme.colors.positive
      : variant === "negative"
      ? theme.colors.negative
      : undefined;

  return (
    <ButtonWrapper>
      <ButtonContainer color={buttonCollor} {...rest}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <AppText
            bold
            color={theme.colors.white}
            size={size}
            style={{
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {title}
          </AppText>
        )}
      </ButtonContainer>
    </ButtonWrapper>
  );
}
