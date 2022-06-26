import {Button, Avatar, Flex, Heading, Box } from '@chakra-ui/react'
import {Link} from 'react-router-dom'

import { useAuthActor } from '../Contexts'

const links = [
  {
    to: '/auth/login',
    label: 'Login'
  },
  {
    to: '/auth/register',
    label: 'Register'
  },
]

const linksForLoggedUser = [
  {
    to: '/admin-panel',
    label: "Admin Panel"
  }
]

const CustomLink: React.FC<typeof links[0]> = ({label, to}) => {
  return <Button type='button' key={label} ml="12px">
    <Link to={to}>{label}</Link>
  </Button>
}

export const MainMenu = () => {
  const {state} = useAuthActor();

  const renderLinks = () => {
    if (state.matches('checkingIfLoggedIn')) {
      return <div />
    }

    if (state.matches('loggedIn')) {
      return (
        <>
          {linksForLoggedUser.map(link => <CustomLink {...link} key={link.label} />)}
          <Avatar name="Admin user" src="https://i.pravatar.cc/300" ml="24px" />
        </>
      )
    }

    return  links.map(link => <CustomLink {...link} key={link.label}  />)
  }

  return (
    <header>
      <nav>
        <Box p="16px" shadow="xs">
          <Flex direction="row" align={'center'} justify="space-between">
            <div>
              <Link to="/">
                <Heading as='h1' size="md">Auth+XState - Real world</Heading>
              </Link>
            </div>
            <Flex align={'center'} justify="flex-end">
              {renderLinks()}
            </Flex>
          </Flex>
        </Box>
      </nav>
    </header>
  )
}

export default MainMenu