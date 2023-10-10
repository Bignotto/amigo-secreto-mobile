import React from "react";
import { IconButton, IconButtonProps } from "./styles";

export default function AppIconButton({ children, ...rest }: IconButtonProps) {
  return <IconButton {...rest}>{children}</IconButton>;
}
