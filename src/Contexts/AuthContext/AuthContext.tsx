import { createContext, useContext } from "react";
import { useInterpret, useSelector, useActor } from "@xstate/react";
import type {InterpreterFrom} from 'xstate'
import { useQueryClient } from "react-query";

import {authenticationMachine} from './authentication.machine'
import { getUserFromApiCall } from "./utils";

export const Context = createContext<{
  authService: InterpreterFrom<typeof authenticationMachine>
} | undefined>(undefined)

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = props => {
  const queryClient = useQueryClient()
  const authService = useInterpret(authenticationMachine, {
    devTools: true,
    services: {
      checkIfLoggedIn: () => async (send) => {
        try {
          const user = await queryClient.fetchQuery('user-data', getUserFromApiCall)

          if (user) {
            send({
              type: 'REPORT_IS_LOGGED_IN',
              user
            })
          } else {
            send({
              type: 'REPORT_IS_LOGGED_OUT'
            })
          }
        } catch (err) {
          send({
            type: 'REPORT_IS_LOGGED_OUT'
          })
        }
      }
    },
  })

  return (
    <Context.Provider value={{authService}}>
      {props.children}
    </Context.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('The `useAuthContext` hook must be used within the AuthContextProvider. Did you forget to wrap your application with the AuthContextProvider?')
  }

  return context
}

export const useAuthStateValue = () => {
  const {authService} = useAuthContext()
  const stateValue = useSelector(authService, state => {
    return state.value as unknown as Parameters<typeof state.matches>[0]
  })

  return stateValue
}

export const useAuthActor = () => {
  const {authService} = useAuthContext()
  const [state, send] = useActor(authService)

  return {state, send}
}

export default AuthContextProvider
