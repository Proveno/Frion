module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'ua', 'de'],
    defaultLocale: 'en',
  },
  env:{
    MONGO_URI: "mongodb+srv://adminUser:M9RasTmoLg35N8AV@cluster0.qhuao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    API_HOST: "http://localhost:3000/api"
  },
  images: {
    domains: ['i.ibb.co'],
  }
}
