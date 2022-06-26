import { Heading } from '@chakra-ui/react'
import {useAuthActor} from '../Contexts'

import { withPrivatePage } from '../hoc'
import { MainMenu, InnerContainer } from '../components'



const AdminPanelInner = () => {
  const {state} = useAuthActor()

  return <div>
    <MainMenu />
      <InnerContainer style={{
        marginTop: 56
      }}>
        <Heading as="h1">Welcome Admin!</Heading>
        <Heading as="h2" size={'md'}>Hello {state.context?.user?.username} {':)'}</Heading>
      </InnerContainer>
  </div>
}

export const AdminPanel = withPrivatePage(AdminPanelInner);
export default AdminPanel