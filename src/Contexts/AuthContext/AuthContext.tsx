import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useInterpret } from "@xstate/react";
import type {InterpreterFrom} from 'xstate'
import { useQueryClient } from "react-query";

import {authenticationMachine} from './authentication.machine'
import { getUserFromApiCall } from "./utils";

export const Context = createContext<{
  authService: InterpreterFrom<typeof authenticationMachine>
} | undefined>(undefined)

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const authService = useInterpret(authenticationMachine, {
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
    actions: {
      navigateToHomepage: () => {
        navigate('/auth/login')
      }
    }
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

export default AuthContextProvider
