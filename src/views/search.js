import * as React from 'react'
import { Text, ImageBackground, StatusBar, Animated } from 'react-native'
import { Logo } from '../components/icons'
import Search from '../components/search'
import Box from '../components/box'
import bg from '../assets/images/bg.jpg'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'

function SearchView() {
  const [heroHeight] = React.useState(new Animated.Value(285))
  const [isSearchFocus, setSearchFocus] = React.useState(false)

  React.useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(heroHeight, {
        toValue: 84,
        duration: 230
      }).start()
    } else {
      Animated.timing(heroHeight, {
        toValue: 285,
        duration: 230
      }).start()
    }
  }, [heroHeight, isSearchFocus])

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content')
    }, [isSearchFocus])
  )

  return (
    <Box as={SafeAreaView} bg={isSearchFocus ? 'softRed' : 'red'} flex={1}>
      {/** Header */}
      <Box
        as={Animated.View}
        position="relative"
        zIndex={1}
        height={heroHeight}
      >
        {!isSearchFocus && (
          <Box
            as={ImageBackground}
            source={bg}
            style={{ width: '100%', height: '100%' }}
          >
            {/** Logo */}
            <Box flex={1} alignItems="center" justifyContent="center">
              <Logo color="white" />
            </Box>
          </Box>
        )}
        {/** Search Box */}
        <Box
          position="absolute"
          left={0}
          bottom={isSearchFocus ? 0 : -42}
          p={16}
          width="100%"
        >
          <Search onChangeFocus={(status) => setSearchFocus(status)} />
        </Box>
      </Box>

      {/** Content */}
      <Box flex={1} bg="white" pt={26}>
        {isSearchFocus ? (
          <Box p={30} flex={1}>
            <Text>History</Text>
          </Box>
        ) : (
          <Box p={30} flex={1}>
            <Text>Hello</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SearchView
