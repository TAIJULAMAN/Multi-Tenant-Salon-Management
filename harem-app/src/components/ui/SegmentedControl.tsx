import React from "react";
import { Platform } from "react-native";
import { SegmentedControl as ExpoSegmentedControl } from "@expo/ui/community/segmented-control";
import type { SegmentedControlProps } from "@expo/ui/community/segmented-control";

let Host: any;
let SingleChoiceSegmentedButtonRow: any;
let SegmentedButton: any;
let ComposeText: any;

if (Platform.OS === "android") {
  try {
    const jetpack = require("@expo/ui/jetpack-compose");
    Host = jetpack.Host;
    SingleChoiceSegmentedButtonRow = jetpack.SingleChoiceSegmentedButtonRow;
    SegmentedButton = jetpack.SegmentedButton;
    ComposeText = jetpack.Text;
  } catch (e) {
    console.warn("Failed to load @expo/ui/jetpack-compose", e);
  }
}

export function SegmentedControl(props: SegmentedControlProps) {
  if (Platform.OS === "android" && Host) {
    const {
      values = [],
      selectedIndex,
      enabled = true,
      onChange,
      onValueChange,
      tintColor,
      appearance,
      style,
    } = props;

    const handleClick = (index: number) => {
      const val = values[index] ?? "";
      onValueChange?.(val);
      onChange?.({
        nativeEvent: {
          selectedSegmentIndex: index,
          value: val,
        },
      });
    };

    // Explicitly configure activeContentColor to white so selected text is readable
    const colors = tintColor
      ? { activeContainerColor: tintColor, activeContentColor: "#FFFFFF" }
      : undefined;

    return (
      <Host matchContents={{ vertical: true }} style={style} colorScheme={appearance}>
        <SingleChoiceSegmentedButtonRow>
          {values.map((label, index) => (
            <SegmentedButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => handleClick(index)}
              enabled={enabled}
              colors={colors}
            >
              <SegmentedButton.Label>
                <ComposeText>{label}</ComposeText>
              </SegmentedButton.Label>
            </SegmentedButton>
          ))}
        </SingleChoiceSegmentedButtonRow>
      </Host>
    );
  }

  return <ExpoSegmentedControl {...props} />;
}
