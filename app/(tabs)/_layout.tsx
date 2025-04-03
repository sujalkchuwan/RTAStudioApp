import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        
        className="lex flex-row w-full flex-1 min-w-[112px] min-h-16 justify-center items-center rounded-full bg-white"
      >
       
        <Text className="text-red-500 text-base  text-lg font-semibold">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center rounded-full">
      <Image source={icon} tintColor="black" className="size-7" />
    </View>
  );
};

const _layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarIconStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 0,

        
          },
          tabBarStyle: {
            backgroundColor: "#ffff",
            borderRadius: 5,
            marginHorizontal: 1,
      
            height: 92,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#fff",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} title="Recent" />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.search} title="Search" />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.save} title="Saved" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;
