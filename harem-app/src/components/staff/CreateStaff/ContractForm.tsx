import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "../../ui/TextInput";
import DropdownSelect from "../../ui/DropdownSelect";

export interface ContractData {
  contractType: string;
  taxId: string;
  iban: string;
  startDate: string;
  endDate: string;
  role: string;
  remunerationType: string;
  amount: string;
}

interface ContractFormProps {
  data: ContractData;
  onChange: (key: keyof ContractData, value: string) => void;
  errors: Partial<Record<keyof ContractData, string>>;
}

const CONTRACT_TYPES = ["Permanent", "Fixed Term", "Freelance", "Apprenticeship", "Internship"];
const ROLES = ["Senior Stylist", "Junior Stylist", "Color Specialist", "Nail Technician", "Esthetician", "Massage Therapist", "Makeup Artist", "Receptionist", "Salon Manager"];
const REMUNERATION_TYPES = ["Fixed", "Hourly", "Commission", "Fixed + Commission"];

export default function ContractForm({ data, onChange, errors }: ContractFormProps) {
  return (
    <View style={styles.container}>
      <DropdownSelect
        label="Contract Type"
        required
        value={data.contractType}
        options={CONTRACT_TYPES}
        onSelect={(val) => onChange("contractType", val)}
        error={errors.contractType}
      />
      <TextInput
        label="Tax ID"
        required
        placeholder="Enter Tax ID"
        value={data.taxId}
        onChangeText={(val) => onChange("taxId", val)}
        error={errors.taxId}
        autoCapitalize="characters"
      />
      <TextInput
        label="IBAN"
        placeholder="Enter IBAN for Salary Payments"
        value={data.iban}
        onChangeText={(val) => onChange("iban", val)}
        error={errors.iban}
        autoCapitalize="characters"
      />
      <TextInput
        label="Start Date"
        required
        placeholder="MM/DD/YYYY"
        value={data.startDate}
        onChangeText={(val) => onChange("startDate", val)}
        error={errors.startDate}
        keyboardType="number-pad"
        maxLength={10}
        rightIcon={<Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={styles.icon} />}
      />
      <TextInput
        label="End Date"
        placeholder="MM/DD/YYYY"
        value={data.endDate}
        onChangeText={(val) => onChange("endDate", val)}
        error={errors.endDate}
        keyboardType="number-pad"
        maxLength={10}
        rightIcon={<Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={styles.icon} />}
      />
      <DropdownSelect
        label="Role"
        required
        placeholder="Select Role"
        value={data.role}
        options={ROLES}
        onSelect={(val) => onChange("role", val)}
        error={errors.role}
      />
      <DropdownSelect
        label="Remuneration Type"
        required
        value={data.remunerationType}
        options={REMUNERATION_TYPES}
        onSelect={(val) => onChange("remunerationType", val)}
        error={errors.remunerationType}
      />
      <TextInput
        label="Amount"
        placeholder="Enter Amount"
        value={data.amount}
        onChangeText={(val) => onChange("amount", val)}
        error={errors.amount}
        keyboardType="numeric"
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
