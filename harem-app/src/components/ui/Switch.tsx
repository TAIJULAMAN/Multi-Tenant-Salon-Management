import React from "react";
import { Host, Switch as ExpoSwitch } from "@expo/ui";

interface ExpoUISwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function ExpoUISwitch({ value, onValueChange }: ExpoUISwitchProps) {
  return (
    <Host matchContents colorScheme="light">
      <ExpoSwitch value={value} onValueChange={onValueChange} />
    </Host>
  );
}
