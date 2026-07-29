import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "../../ui/TextInput";
import DropdownSelect from "../../ui/DropdownSelect";

export interface GeneralInfoData {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  city: string;
  province: string;
  cap: string;
}

interface GeneralInfoFormProps {
  data: GeneralInfoData;
  onChange: (key: keyof GeneralInfoData, value: string) => void;
  errors: Partial<Record<keyof GeneralInfoData, string>>;
}

const PROVINCES = [
  "Agrigento (AG)", "Alessandria (AL)", "Ancona (AN)", "Aosta (AO)", "Arezzo (AR)",
  "Ascoli Piceno (AP)", "Asti (AT)", "Avellino (AV)", "Bari (BA)", "Barletta-Andria-Trani (BT)",
  "Belluno (BL)", "Benevento (BN)", "Bergamo (BG)", "Biella (BI)", "Bologna (BO)",
  "Bolzano (BZ)", "Brescia (BS)", "Brindisi (BR)", "Cagliari (CA)", "Caltanissetta (CL)",
  "Campobasso (CB)", "Caserta (CE)", "Catania (CT)", "Catanzaro (CZ)", "Chieti (CH)",
  "Como (CO)", "Cosenza (CS)", "Cremona (CR)", "Crotone (KR)", "Cuneo (CN)",
  "Enna (EN)", "Fermo (FM)", "Ferrara (FE)", "Firenze (FI)", "Foggia (FG)",
  "Forlì-Cesena (FC)", "Frosinone (FR)", "Genova (GE)", "Gorizia (GO)", "Grosseto (GR)",
  "Imperia (IM)", "Isernia (IS)", "L'Aquila (AQ)", "La Spezia (SP)", "Latina (LT)",
  "Lecce (LE)", "Lecco (LC)", "Livorno (LI)", "Lodi (LO)", "Lucca (LU)",
  "Macerata (MC)", "Mantova (MN)", "Massa-Carrara (MS)", "Matera (MT)", "Messina (ME)",
  "Milano (MI)", "Monza e della Brianza (MB)", "Napoli (NA)", "Novara (NO)", "Nuoro (NU)",
  "Oristano (OR)", "Padova (PD)", "Palermo (PA)", "Parma (PR)", "Pavia (PV)",
  "Perugia (PG)", "Pesaro e Urbino (PU)", "Pescara (PE)", "Piacenza (PC)", "Pisa (PI)",
  "Pistoia (PT)", "Pordenone (PN)", "Potenza (PZ)", "Prato (PO)", "Ragusa (RG)",
  "Ravenna (RA)", "Reggio Calabria (RC)", "Reggio Emilia (RE)", "Rieti (RI)", "Rimini (RN)",
  "Roma (RM)", "Rovigo (RO)", "Salerno (SA)", "Sassari (SS)", "Savona (SV)",
  "Siena (SI)", "Siracusa (SR)", "Sondrio (SO)", "Sud Sardegna (SU)", "Taranto (TA)",
  "Teramo (TE)", "Terni (TR)", "Torino (TO)", "Trapani (TP)", "Trento (TN)",
  "Treviso (TV)", "Trieste (TS)", "Udine (UD)", "Varese (VA)", "Venezia (VE)",
  "Verbano-Cusio-Ossola (VB)", "Vercelli (VC)", "Verona (VR)", "Vibo Valentia (VV)", "Vicenza (VI)",
  "Viterbo (VT)"
];

export default function GeneralInfoForm({ data, onChange, errors }: GeneralInfoFormProps) {
  return (
    <View style={styles.container}>
      <TextInput
        label="First Name"
        required
        placeholder="Enter first name"
        value={data.firstName}
        onChangeText={(val) => onChange("firstName", val)}
        error={errors.firstName}
      />
      <TextInput
        label="Last Name"
        required
        placeholder="Enter last name"
        value={data.lastName}
        onChangeText={(val) => onChange("lastName", val)}
        error={errors.lastName}
      />
      <TextInput
        label="Date of Birth"
        required
        placeholder="MM/DD/YYYY"
        value={data.dob}
        onChangeText={(val) => onChange("dob", val)}
        error={errors.dob}
        keyboardType="number-pad"
        maxLength={10}
        rightIcon={<Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={styles.icon} />}
      />
      <TextInput
        label="Address"
        required
        placeholder="Enter Address"
        value={data.address}
        onChangeText={(val) => onChange("address", val)}
        error={errors.address}
      />
      <TextInput
        label="City"
        required
        placeholder="Enter city"
        value={data.city}
        onChangeText={(val) => onChange("city", val)}
        error={errors.city}
      />
      <DropdownSelect
        label="Province"
        required
        placeholder="Select province"
        value={data.province}
        options={PROVINCES}
        onSelect={(val) => onChange("province", val)}
        error={errors.province}
      />
      <TextInput
        label="CAP"
        required
        placeholder="Enter CAP"
        value={data.cap}
        onChangeText={(val) => onChange("cap", val)}
        error={errors.cap}
        keyboardType="number-pad"
        maxLength={5}
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
