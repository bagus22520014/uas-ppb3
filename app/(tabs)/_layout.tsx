import React, { useEffect, useState } from "react";
import { Keyboard, View, Text, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const TabLayout = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: isKeyboardVisible ? -100 : 20, // Geser keluar layar jika keyboard aktif
          marginHorizontal: 20,
          height: 72,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarButton: (props: any) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
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

export default TabLayout;
