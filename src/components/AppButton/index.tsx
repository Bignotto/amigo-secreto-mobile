import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { ButtonContainer, ButtonText } from "./styles";

type AppButtonProps = RectButtonProps & {
  title: string;
  variant?: "positive" | "solid" | "negative";
  isLoading?: boolean;
};

export default function AppButton({
  title,
  variant = "solid",
  isLoading = false,
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
    <ButtonContainer color={buttonCollor} {...rest}>
      {isLoading ? <ActivityIndicator /> : <ButtonText>{title}</ButtonText>}
    </ButtonContainer>
  );
}
