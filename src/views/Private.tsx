import { useSelector, useActor } from '@xstate/react'
import {useAuthContext} from '../Contexts'

export const Private = () => {
  const {authService} = useAuthContext()

  const stateValue = useSelector(authService, state => state.value)
  const [{context: user}] = useActor(authService)

  console.log({ stateValue, user });

  if (stateValue === 'checkingIfLoggedIn') {
    return <div>loading...</div>
  }

  return <div>
    <br />
    <h1>Hello {user?.username}</h1>
  </div>
}

export default Private