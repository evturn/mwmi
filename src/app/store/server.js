import configureStore from 'store'

export default res => {
  return configureStore({
    podcast: res.podcast,
    enquiry: res.enquiry,
    site: {
      user: res.user,
      nav: res.nav
    },
    gallery: res.gallery
  })
}