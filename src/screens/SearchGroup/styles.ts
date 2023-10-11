import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.text_disabled};
  border-width: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const IconWrapper = styled.View`
  margin-left: 8px;
  margin-right: 8px;
`;

export const InputComponent = styled(TextInput).attrs<TextInput>({
  placeholderTextColor: "#4A5568",
})`
  padding: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const SearchResultsContainer = styled.ScrollView``;

export const SearchResultItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 4px;
  margin-bottom: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${({ theme }) => theme.colors.shape_dark};
  border-radius: 8px;
`;

export const GroupLeft = styled.View``;

export const GroupMiddle = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const GroupRight = styled.View``;
