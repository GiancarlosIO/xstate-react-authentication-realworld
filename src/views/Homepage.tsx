import { Heading, Text } from "@chakra-ui/react"
import { MainMenu, InnerContainer } from "../components"

export const Homepage = () => {
  return (
    <>
      <MainMenu />
      <InnerContainer>
        <Heading as="h1" mt="24px" mb="24px">Welcome to the Xstate + React authentication example.</Heading>
        <Text>
          This app shows how to use xstate with a real-world authentication flow.
        </Text>
      </InnerContainer>
    </>
  )
}

export default Homepage