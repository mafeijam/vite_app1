self.addEventListener('push', e => {
  let { title, body = 'na' } = e.data.json()
  console.log(title, body)

  e.waitUntil(
    self.registration.showNotification(title, { body })
  )
})
