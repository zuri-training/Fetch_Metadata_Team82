app.get('/', (req, res) => {
    res.download("./fetch-meta-data.herokuapp.com/upload")
})

const pageUrl = location.href
const message = 'Here is the metadata for'

const whatsAppApi = `https://wa.me/?text=${pageUrl}. ${message}`
const telegramApi = `https://t.me/share/url?url=${pageUrl}&text=${message}`
const twitterApi = `https://twitter.com/intent/tweet?text=${pageUrl}. ${message}`

const whatsApp = document.querySelector('.whatsApp')
const telegram = document.querySelector('.telegram')
const twitter = document.querySelector('.twitter')

whatsApp.addEventListener('click', () => {
    window.open(url = whatsAppApi, target='blank')
})

telegram.addEventListener('click', () => {
    window.open(url = telegramApi, target='blank')
})

twitter.addEventListener('click', () => {
    window.open(url = twitterApi, target='blank')
})