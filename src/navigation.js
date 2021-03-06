import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import SearchView from './views/search'
import HistoryView from './views/history'
import FavoriteView from './views/favorite'
import DetailView from './views/detail'

import theme from './utils/theme'
import TabBar from './components/tab-bar'
import Button from './components/button'
import { LeftArrow, More } from './components/icons'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchView}
        options={() => {
          return {
            headerShown: false
          }
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailView}
        options={({ route, navigation }) => {
          return {
            title: route.params?.title,
            headerStyle: {
              backgroundColor: theme.colors.softRed,
              shadowColor: 'transparent'
            },
            headerLeft: () => (
              <Button
                px={16}
                height="100%"
                onPress={() => navigation.navigate('Search')}
              >
                <LeftArrow color={theme.colors.textDark} />
              </Button>
            ),
            headerRight: () => (
              <Button
                px={16}
                height="100%"
                onPress={() => navigation.navigate('Search')}
              >
                <More color={theme.colors.textDark} />
              </Button>
            )
          }
        }}
      />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="History" component={HistoryView} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="Favorite" component={FavoriteView} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigator
