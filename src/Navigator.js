import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import HomeScreen from "./HomeScreen";
import NewsScreen from './NewsScreen';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='HomeScreen'
                component={HomeScreen}
                options={{
                    headerShown: true,  
                    title: 'News',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen 
                name='News'
                component={NewsScreen}
                options={{
                    headerShown: true,  
                    title: 'News',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}