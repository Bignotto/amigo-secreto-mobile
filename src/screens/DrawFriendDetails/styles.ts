import styled from "styled-components/native";

export const FriendContainer = styled.View`
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const TopContent = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

export const SizeInfo = styled.View`
  flex: 1;
  align-items: center;
`;

export const InfoContent = styled.View`
  margin-top: 12px;
  width: 80%;
`;

export const InfoWrapper = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
`;
