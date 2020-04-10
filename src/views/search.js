import * as React from 'react'
import { FlatList, StatusBar, Animated } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'
import Search from '../components/search'
import Box from '../components/box'
import Text from '../components/text'
import Bg from '../components/bg'
import { Logo } from '../components/icons'
import { CardContainer, CardTitle, CardSummary } from '../components/card'
import { SimpleCardTitle, SimpleCardContainer } from '../components/simple-card'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    summary: 'summary test 1'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    summary: 'summary test 2'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    summary: 'summary test 3'
  }
]

const HERO_HEIGHT = 230

function SearchView({ navigation }) {
  const [bgOpacity] = React.useState(new Animated.Value(1))
  const [heroHeight] = React.useState(new Animated.Value(HERO_HEIGHT))
  const [isSearchFocus, setSearchFocus] = React.useState(false)

  React.useEffect(() => {
    if (isSearchFocus) {
      // hero opacity
      Animated.timing(bgOpacity, {
        toValue: 0,
        duration: 230
      }).start()
      // hero height
      Animated.timing(heroHeight, {
        toValue: 84,
        duration: 230
      }).start()
    } else {
      // hero opacity
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 230
      }).start()
      // hero height
      Animated.timing(heroHeight, {
        toValue: HERO_HEIGHT,
        duration: 230
      }).start()
    }
  }, [bgOpacity, heroHeight, isSearchFocus])

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
        <Box mt={-60} as={Animated.View} opacity={bgOpacity}>
          <Bg pt={60} pb={26}>
            <Box flex={1} alignItems="center" justifyContent="center">
              <Logo color="white" />
            </Box>
          </Bg>
        </Box>

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
      <Box flex={1} bg="softRed" pt={26}>
        {isSearchFocus ? (
          <Box flex={1}>
            <FlatList
              style={{ padding: 16 }}
              data={DATA}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <Text color="textLight" mb={10}>
                  Latest Search
                </Text>
              }
              renderItem={({ item }) => (
                <Box py={6}>
                  <SimpleCardContainer>
                    <SimpleCardTitle>{item.title}</SimpleCardTitle>
                  </SimpleCardContainer>
                </Box>
              )}
            />
          </Box>
        ) : (
          <Box px={16} py={40} flex={1}>
            <Box>
              <Text pl={8} color="textLight">
                Bir Atasözü
              </Text>

              <CardContainer
                mt={10}
                onPress={() =>
                  navigation.navigate('Detail', { title: 'on para' })
                }
              >
                <CardTitle>on para</CardTitle>
                <CardSummary>çok az (para).</CardSummary>
              </CardContainer>
            </Box>

            <Box mt={40}>
              <Text pl={8} color="textLight">
                Bir Deyim
              </Text>

              <CardContainer
                mt={10}
                onPress={() =>
                  navigation.navigate('Detail', {
                    title: 'siyem siyem ağlamak'
                  })
                }
              >
                <CardTitle>siyem siyem ağlamak</CardTitle>
                <CardSummary>
                  hafif hafif, ince ince, durmadan gözyaşı dökmek.
                </CardSummary>
              </CardContainer>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SearchView
