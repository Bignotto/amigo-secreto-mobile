import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const GroupWrapper = styled.View`
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
