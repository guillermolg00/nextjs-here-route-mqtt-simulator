export const environment = {
  get HERE_API_KEY () {return process.env.NEXT_PUBLIC_HERE_API_KEY || ''},
  get HERE_APP_ID () {return process.env.NEXT_PUBLIC_HERE_APP_ID || ''},
}
