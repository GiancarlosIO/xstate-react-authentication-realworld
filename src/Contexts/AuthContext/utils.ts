import type { TUser } from "./authentication.machine"

export const getUserFromApiCall: () => Promise<TUser> = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail  = Math.random() < 0.5;
      if (shouldFail) {
        resolve(undefined)
      } else {
        resolve({
          id: '2123',
          username: 'giancarlos',
          email: 'giancarlos.isasi@gmail.com',
        })
      }
    }, 1500)
  })
}