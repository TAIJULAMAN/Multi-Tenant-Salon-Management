import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "../../ui/TextInput";

export interface ContactInfoData {
  email: string;
  telephone: string;
  emergencyContactName: string;
  emergencyContactTelephone: string;
}

interface ContactInfoFormProps {
  data: ContactInfoData;
  onChange: (key: keyof ContactInfoData, value: string) => void;
  errors: Partial<Record<keyof ContactInfoData, string>>;
}

export default function ContactInfoForm({ data, onChange, errors }: ContactInfoFormProps) {
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        required
        placeholder="Enter Email"
        value={data.email}
        onChangeText={(val) => onChange("email", val)}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Telephone"
        placeholder="+1 (555) 000-0000"
        value={data.telephone}
        onChangeText={(val) => onChange("telephone", val)}
        error={errors.telephone}
        keyboardType="phone-pad"
        rightIcon={<Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.icon} />}
      />
      <TextInput
        label="Emergency Contact Name"
        placeholder="Enter Emergency Contact Name"
        value={data.emergencyContactName}
        onChangeText={(val) => onChange("emergencyContactName", val)}
        error={errors.emergencyContactName}
      />
      <TextInput
        label="Emergency Contact Telephone"
        placeholder="Enter Emergency Contact Telephone"
        value={data.emergencyContactTelephone}
        onChangeText={(val) => onChange("emergencyContactTelephone", val)}
        error={errors.emergencyContactTelephone}
        keyboardType="phone-pad"
        rightIcon={<Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.icon} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  icon: {
    marginRight: 8,
  },
});
