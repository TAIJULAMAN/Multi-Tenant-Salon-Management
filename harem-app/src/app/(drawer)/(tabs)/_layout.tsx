import { NativeTabs } from "expo-router/unstable-native-tabs";
import { usePathname } from "expo-router";

export default function TabLayout() {
  const pathname = usePathname();
  const isRootTab =
    pathname === "/" ||
    pathname === "/staff" ||
    pathname === "/calendar" ||
    pathname === "/finance" ||
    pathname === "/statistics";

  return (
    <NativeTabs
      backgroundColor="#ffffff"
      labelVisibilityMode="labeled"
      tintColor="#5C55FF"
      iconColor={{ default: "#9CA3AF", selected: "#5C55FF" }}
      labelStyle={{
        default: { color: "#9CA3AF", fontSize: 11 },
        selected: { color: "#5C55FF", fontSize: 11 }
      }}
      indicatorColor={"#fff"}
      hidden={!isRootTab}
    >
      <NativeTabs.Trigger
        name="(home)"
      >
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="staff"

      >
        <NativeTabs.Trigger.Label>Staff</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.2" md="people" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="calendar"

      >
        <NativeTabs.Trigger.Label>Calendar</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_today" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="finance"

      >
        <NativeTabs.Trigger.Label>Finance</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.bar" md="bar_chart" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="statistics"

      >
        <NativeTabs.Trigger.Label>Statistics</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="chart.line.uptrend.xyaxis" md="trending_up" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
