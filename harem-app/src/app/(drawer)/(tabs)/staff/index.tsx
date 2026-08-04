import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";
import { useRouter } from "expo-router";

const initialMembers = [
  {
    id: "1",
    name: "Cameron Williamson",
    role: "Senior Stylist",
    rating: 4.5,
    reviewsCount: 124,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "2",
    name: "Leslie Alexander",
    role: "Senior Stylist",
    rating: 5.0,
    reviewsCount: 124,
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "3",
    name: "Robert Fox",
    role: "Senior Stylist",
    rating: 5.0,
    reviewsCount: 124,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
  },
];

const initialSalaries = [
  {
    id: "sal1",
    name: "Maria Rodriguez",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "Under Review",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "sal2",
    name: "Maria Rodriguez",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "Under Review",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
];

const initialShifts = [
  {
    id: "shift1",
    name: "Maria Rodriguez",
    weeklyTotal: "52h",
    time: "10:00 - 19:00",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "shift2",
    name: "Alex Miller",
    weeklyTotal: "40h",
    time: "10:00 - 19:00",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
];

const initialWorkedShifts = [
  {
    id: "work1",
    name: "Maria Rodriguez",
    role: "STAFF",
    totalHours: "72h 30m",
    daysWorked: "10 Days",
    avgDay: "7.2h",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "work2",
    name: "Cameron Williamson",
    role: "STAFF",
    totalHours: "72h 30m",
    daysWorked: "10 Days",
    avgDay: "7.2h",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
];

export default function StaffScreen() {
  const router = useRouter();
  const [salariesTab, setSalariesTab] = useState("Pending Approval (5)");
  const [workedTab, setWorkedTab] = useState("Pending Approval (5)");
  const [salariesList, setSalariesList] = useState(initialSalaries);

  const handleApprove = (id: string, name: string) => {
    Alert.alert("Approved", `Salary for ${name} has been approved.`);
    setSalariesList(salariesList.filter((item) => item.id !== id));
  };

  const handleReject = (id: string, name: string) => {
    Alert.alert("Rejected", `Salary for ${name} has been rejected.`);
    setSalariesList(salariesList.filter((item) => item.id !== id));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesome key={i} name="star" size={12} color="#5C55FF" style={styles.star} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesome key={i} name="star-half-empty" size={12} color="#5C55FF" style={styles.star} />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={12} color="#D1D5DB" style={styles.star} />);
      }
    }
    return <View style={styles.starsRow}>{stars}</View>;
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Members Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="people-outline" size={18} color="#5C55FF" />
              </View>
              <Text style={styles.sectionTitle}>Members</Text>
            </View>
          </View>

          <View style={styles.listContainer}>
            {initialMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <Avatar name={member.name} uri={member.avatar} size={48} />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                  <View style={styles.ratingRow}>
                    {renderStars(member.rating)}
                    <Text style={styles.ratingText}>{member.rating.toFixed(1)}</Text>
                    <Text style={styles.reviewsText}>({member.reviewsCount} reviews)</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.optionsButton}>
                  <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.seeAllLink} onPress={() => router.push("/staff/members")}>
            <Text style={styles.seeAllLinkText}>See All Members</Text>
          </TouchableOpacity>
        </View>

        {/* Salaries Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="wallet-outline" size={18} color="#5C55FF" />
              </View>
              <Text style={styles.sectionTitle}>Salaries</Text>
            </View>
          </View>

          {/* Sub-tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.subTab, salariesTab === "Pending Approval (5)" && styles.subTabActive]}
              onPress={() => setSalariesTab("Pending Approval (5)")}
            >
              <Text style={[styles.subTabText, salariesTab === "Pending Approval (5)" && styles.subTabTextActive]}>
                Pending Approval (5)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subTab, salariesTab === "Pending Payment (0)" && styles.subTabActive]}
              onPress={() => setSalariesTab("Pending Payment (0)")}
            >
              <Text style={[styles.subTabText, salariesTab === "Pending Payment (0)" && styles.subTabTextActive]}>
                Pending Payment (0)
              </Text>
            </TouchableOpacity>
          </View>

          {salariesTab === "Pending Approval (5)" ? (
            <View style={styles.listContainer}>
              {salariesList.length === 0 ? (
                <Text style={styles.emptyText}>No pending salaries to approve.</Text>
              ) : (
                salariesList.map((item) => (
                  <View key={item.id} style={styles.salaryCard}>
                    <View style={styles.salaryCardHeader}>
                      <View style={styles.salaryUser}>
                        <Avatar name={item.name} uri={item.avatar} size={40} />
                        <View style={styles.salaryUserInfo}>
                          <Text style={styles.salaryName}>{item.name}</Text>
                          <Text style={styles.salaryRoleBadge}>{item.role}</Text>
                        </View>
                      </View>
                      <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
                    </View>

                    <View style={styles.salaryGrid}>
                      <View style={styles.salaryGridCol}>
                        <Text style={styles.salaryGridLabel}>Net Amount</Text>
                        <Text style={styles.salaryGridValue}>{item.netAmount}</Text>
                      </View>
                      <View style={styles.salaryGridCol}>
                        <Text style={styles.salaryGridLabel}>Month</Text>
                        <Text style={styles.salaryGridValue}>{item.month}</Text>
                      </View>
                    </View>

                    <View style={styles.salaryTags}>
                      <View style={styles.salaryTagDate}>
                        <Text style={styles.salaryTagDateText}>{item.date}</Text>
                      </View>
                      <View style={styles.salaryTagStatus}>
                        <Text style={styles.salaryTagStatusText}>{item.status}</Text>
                      </View>
                    </View>

                    <View style={styles.salaryActions}>
                      <TouchableOpacity
                        style={styles.btnApprove}
                        onPress={() => handleApprove(item.id, item.name)}
                      >
                        <Ionicons name="checkmark-circle-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
                        <Text style={styles.btnTextApprove}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnReject}
                        onPress={() => handleReject(item.id, item.name)}
                      >
                        <Ionicons name="close-circle-outline" size={16} color="#EF4444" style={styles.btnIcon} />
                        <Text style={styles.btnTextReject}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          ) : (
            <Text style={styles.emptyText}>No pending payments.</Text>
          )}

          <TouchableOpacity style={styles.seeAllLink} onPress={() => router.push("/staff/salaries")}>
            <Text style={styles.seeAllLinkText}>See Salary Details</Text>
          </TouchableOpacity>
        </View>

        {/* Scheduled Shifts Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="time-outline" size={18} color="#5C55FF" />
              </View>
              <Text style={styles.sectionTitle}>Scheduled Shifts</Text>
            </View>
          </View>

          <Text style={styles.shiftDateHeader}>Monday, 11 Aug</Text>

          <View style={styles.listContainer}>
            {initialShifts.map((shift) => (
              <View key={shift.id} style={styles.shiftCard}>
                <View style={styles.shiftUser}>
                  <Avatar name={shift.name} uri={shift.avatar} size={36} />
                  <View style={styles.shiftUserInfo}>
                    <Text style={styles.shiftUserName}>{shift.name}</Text>
                    <Text style={styles.shiftUserHours}>Weekly Total : <Text style={styles.boldText}>{shift.weeklyTotal}</Text></Text>
                  </View>
                </View>
                <View style={styles.shiftRight}>
                  <View style={styles.shiftTimeBadge}>
                    <Text style={styles.shiftTimeBadgeText}>{shift.time}</Text>
                  </View>
                  <TouchableOpacity style={styles.shiftEditBtn}>
                    <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.seeAllLink} onPress={() => router.push("/staff/scheduleShift" as any)}>
            <Text style={styles.seeAllLinkText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Worked Shifts Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="checkmark-done-circle-outline" size={18} color="#5C55FF" />
              </View>
              <Text style={styles.sectionTitle}>Worked Shifts</Text>
            </View>
          </View>

          {/* Sub-tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.subTab, workedTab === "Pending Approval (5)" && styles.subTabActive]}
              onPress={() => setWorkedTab("Pending Approval (5)")}
            >
              <Text style={[styles.subTabText, workedTab === "Pending Approval (5)" && styles.subTabTextActive]}>
                Pending Approval (5)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subTab, workedTab === "Pending Payment (0)" && styles.subTabActive]}
              onPress={() => setWorkedTab("Pending Payment (0)")}
            >
              <Text style={[styles.subTabText, workedTab === "Pending Payment (0)" && styles.subTabTextActive]}>
                Pending Payment (0)
              </Text>
            </TouchableOpacity>
          </View>

          {workedTab === "Pending Approval (5)" ? (
            <View style={styles.listContainer}>
              {initialWorkedShifts.map((work) => (
                <View key={work.id} style={styles.workedCard}>
                  <View style={styles.workedCardHeader}>
                    <View style={styles.workedUser}>
                      <Avatar name={work.name} uri={work.avatar} size={36} />
                      <View style={styles.workedUserInfo}>
                        <Text style={styles.workedUserName}>{work.name}</Text>
                        <Text style={styles.workedUserBadge}>{work.role}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.viewWorkedBtn}>
                      <Ionicons name="eye-outline" size={18} color="#5C55FF" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.workedStatsGrid}>
                    <View style={styles.workedStatsCol}>
                      <Text style={styles.workedStatsLabel}>TOTAL HOURS</Text>
                      <Text style={styles.workedStatsValue}>{work.totalHours}</Text>
                    </View>
                    <View style={styles.workedStatsCol}>
                      <Text style={styles.workedStatsLabel}>DAYS WORKED</Text>
                      <Text style={styles.workedStatsValue}>{work.daysWorked}</Text>
                    </View>
                    <View style={styles.workedStatsCol}>
                      <Text style={styles.workedStatsLabel}>AVG/DAY</Text>
                      <Text style={styles.workedStatsValue}>{work.avgDay}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No pending shifts to pay.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  sectionTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  listContainer: {
    marginBottom: 12,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },
  memberName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 2,
  },
  memberRole: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#5C55FF",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsRow: {
    flexDirection: "row",
    marginRight: 6,
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: "#1F2937",
    marginRight: 6,
  },
  reviewsText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: "#9CA3AF",
  },
  optionsButton: {
    padding: 8,
  },
  seeAllLink: {
    alignItems: "center",
    paddingTop: 8,
  },
  seeAllLinkText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#5C55FF",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  subTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  subTabActive: {
    backgroundColor: "#5C55FF",
  },
  subTabText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#6B7280",
  },
  subTabTextActive: {
    color: "#FFFFFF",
  },
  emptyText: {
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 13,
  },
  salaryCard: {
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  salaryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  salaryUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  salaryUserInfo: {
    marginLeft: 10,
  },
  salaryName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
  },
  salaryRoleBadge: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#00D2C4",
    backgroundColor: "#E6FAF8",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  salaryGrid: {
    flexDirection: "row",
    marginBottom: 12,
  },
  salaryGridCol: {
    flex: 1,
  },
  salaryGridLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  salaryGridValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
  },
  salaryTags: {
    flexDirection: "row",
    marginBottom: 16,
  },
  salaryTagDate: {
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  salaryTagDateText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#3B82F6",
  },
  salaryTagStatus: {
    backgroundColor: "#FFFBEB",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  salaryTagStatusText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#D97706",
  },
  salaryActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnApprove: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C55FF",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
  },
  btnReject: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1F2",
    borderRadius: 8,
    paddingVertical: 10,
  },
  btnIcon: {
    marginRight: 4,
  },
  btnTextApprove: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  btnTextReject: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#EF4444",
  },
  shiftDateHeader: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 12,
  },
  shiftCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  shiftUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  shiftUserInfo: {
    marginLeft: 10,
  },
  shiftUserName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  shiftUserHours: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
  },
  boldText: {
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  shiftRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  shiftTimeBadge: {
    backgroundColor: "#F0EFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  shiftTimeBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  shiftEditBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
  },
  workedCard: {
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  workedCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  workedUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  workedUserInfo: {
    marginLeft: 10,
  },
  workedUserName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  workedUserBadge: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    color: "#00D2C4",
    backgroundColor: "#E6FAF8",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  viewWorkedBtn: {
    padding: 6,
  },
  workedStatsGrid: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 10,
  },
  workedStatsCol: {
    flex: 1,
    alignItems: "center",
  },
  workedStatsLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 8,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  workedStatsValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#1F2937",
  },
});
