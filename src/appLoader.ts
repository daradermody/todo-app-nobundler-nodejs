let fetchCount = 0

async function main() {
  const start = new Date()
  await setupServiceWorker()
  setupServiceWorkerListener()
  // @ts-ignore
  const {setupApp} = await import('/main.js')
  const end = new Date()
  const loadTimeMs = (end.valueOf() - start.valueOf()) / 1000
  setupApp(fetchCount, loadTimeMs)
}

function setupServiceWorker() {
  return new Promise<void>((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (!('serviceWorker' in navigator)) {
        return resolve()
      }

      try {
        const registration = await navigator.serviceWorker!.register('serviceWorker.js')
        console.log('Service worker registered with scope: ', registration.scope)
        return resolve()
      } catch (e) {
        reject(e)
      }
    })
  })
}

function setupServiceWorkerListener() {
  const broadcast = new BroadcastChannel('main')
  broadcast.onmessage = (event) => {
    if (event.data && event.data.type === 'FETCH') {
      fetchCount += 1
      document.getElementById('fetch-number').textContent = `${fetchCount}`
    }
  }
}

void main()
