import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tabnavigator";
import Story from '../screens/story';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="Story" component={Story} />
        </Stack.Navigator>
    );
};

export default StackNavigator;