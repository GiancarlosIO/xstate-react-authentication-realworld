import { createMachine, assign } from "xstate";

export type TUser = {
  id: string;
  email: string;
  username: string;
} | undefined;

export type TContext = {
  user: TUser
} | undefined

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
  context: TContext
} | {
  value: "loggedOut",
  context: undefined
}

export const authenticationMachine = createMachine<TContext, TAuthenticationMachineEvent, TAuthenticationMachineStates>({
  schema: {
    services: {} as {
      checkIfLoggedIn: {
        data: { user: TUser }
      }
    },
    context: {} as TContext
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
      // entry: ['onLoggedOut', 'clearUserDetailsFromContext'],
      entry: [ 'clearUserDetailsFromContext'],
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
        user: event.user
      }
    }),
    clearUserDetailsFromContext: assign((context, event) => {
      return undefined
    })
  }
})