import {Navigate} from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { Text } from '@chakra-ui/react'
import {useAuthStateValue} from '../Contexts'

const SpinnerStyled = createGlobalStyle`
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid purple;
  border-color: purple transparent purple transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`

const SpinnerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export function withPrivatePage<TProps>(Component: React.FC<TProps>) {
  return (props: TProps) => {
    const stateValue = useAuthStateValue()

    if (stateValue === 'checkingIfLoggedIn') {
      return <>
        <SpinnerStyled />
        <SpinnerWrapper>
          <div className="lds-dual-ring"></div>
          <Text>Loading data...</Text>
        </SpinnerWrapper>
      </>
    }

    if (stateValue === 'loggedOut') {
      return <Navigate to="/auth/login/" />
    }

    return <Component {...props} />
  }
}



export default withPrivatePage