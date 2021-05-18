const withPWA = require('next-pwa')

const account = process.env.STORAGE_ACCOUNT_NAME || ''
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !prod,
  },
  images: {
    domains: [`${account}.blob.core.windows.net`],
  },
})
