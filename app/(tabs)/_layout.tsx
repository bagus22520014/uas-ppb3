import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

const tabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 27,
          marginHorizontal: 16,
          height: 72,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                width: 70,
              }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? Colors.primaryColors : Colors.gray}
                size={32}
              />
              <Text
                style={{
                  color: focused ? Colors.primaryColors : Colors.gray,
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 70,
                width: 70,
                borderRadius: 999,
                backgroundColor: Colors.primaryColors,
                marginBottom: 12,
              }}
            >
              <Ionicons name="add" color="#fff" size={32} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                width: 70,
              }}
            >
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={focused ? Colors.primaryColors : Colors.gray}
                size={32}
              />
              <Text
                style={{
                  color: focused ? Colors.primaryColors : Colors.gray,
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default tabLayout;
