import { Stack } from "expo-router";

export default function StaffLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="members" />
      <Stack.Screen name="salaries" />
      <Stack.Screen name="add" />
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="scheduleShift/index" />
      <Stack.Screen name="scheduleShift/add" />
    </Stack>
  );
}
