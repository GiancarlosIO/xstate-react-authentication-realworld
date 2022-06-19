import { createMachine, assign } from "xstate";

export type TUser = {
  id: string;
  email: string;
  username: string;
} | undefined;

export type TAuthenticationMachineEvent = | {
  type: 'REPORT_IS_LOGGED_IN',
  user: TUser
} | {
  type: 'REPORT_IS_LOGGED_OUT',
} | {
  type: 'LOG_OUT',
} | {
  type: 'LOG_IN',
  user: TUser
}

export type TAuthenticationMachineStates = {
  value: 'checkingIfLoggedIn'
  context: undefined
} | {
  value: 'loggedIn'
  context: TUser
} | {
  value: "loggedOut",
  context: undefined
}

export const authenticationMachine = createMachine<TUser, TAuthenticationMachineEvent, TAuthenticationMachineStates>({
  schema: {
    services: {} as {
      checkIfLoggedIn: {
        data: { user: TUser }
      }
    }
  },
  id: 'authentication',
  initial: 'checkingIfLoggedIn',
  states: {
    checkingIfLoggedIn: {
      invoke: {
        src: 'checkIfLoggedIn',
        onError: {
          target: 'loggedOut'
        }
      },
      on: {
        REPORT_IS_LOGGED_IN: {
          target: 'loggedIn',
          actions: 'assignUserDetailsToContext',
        },
        REPORT_IS_LOGGED_OUT: 'loggedOut',
      }
    },
    loggedIn: {
      on: {
        LOG_OUT: {
          target: 'loggedOut'
        }
      }
    },
    loggedOut: {
      entry: ['navigateToHomepage', 'clearUserDetailsFromContext'],
      on: {
        LOG_IN: {
          target: 'loggedIn',
        }
      }
    }
  }
}, {
  actions: {
    assignUserDetailsToContext: assign((context, event) => {
      if (event.type !== 'REPORT_IS_LOGGED_IN') {
        return {}
      }
      return {
        ...event.user
      }
    }),
    clearUserDetailsFromContext: assign((context, event) => {
      return undefined
    })
  }
})