
export const getApiResource = async (url) => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      console.error('Could not fetch.', res.status)
      return false
    }

    return await res.json()
  } catch (error) {
    console.error('Could not fetch.', error.message)
    /* return false */
  }
}

export const getApiResources = async (urls) => {
  try {
    return await Promise.all(urls.map(async url => {
      const res = await fetch(url)

      return await res.json()
    }))

  } catch (error) {
    console.error('Could not fetch.', error.message)
  }
}
