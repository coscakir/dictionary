import React from 'react'

import Button from './button'
import { Search, Bookmark, History } from './icons'
import Box from './box'

import theme from '../utils/theme'

function TabBar({ state, descriptors, navigation }) {
  return (
    <Box
      flexDirection="row"
      bg="white"
      pb={20}
      style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return label === 'Search' ? (
          <Box key={label} p={15} borderRadius="full" mt={-15} bg="white">
            <Button
              p={16}
              height={56}
              bg="red"
              borderRadius="full"
              onPress={onPress}
            >
              <Search color="white" />
            </Button>
          </Box>
        ) : (
          <Button
            key={label}
            pt={6}
            height={56}
            flex={1}
            flexDirection="column"
            onPress={onPress}
          >
            {label === 'History' && (
              <History
                color={isFocused ? theme.colors.red : theme.colors.textLight}
              />
            )}
            {label === 'Favorite' && (
              <Bookmark
                color={isFocused ? theme.colors.red : theme.colors.textLight}
              />
            )}
            <Box
              borderRadius="full"
              size={4}
              bg={isFocused ? 'red' : 'white'}
              mt={6}
            />
          </Button>
        )
      })}
    </Box>
  )
}

export default TabBar
