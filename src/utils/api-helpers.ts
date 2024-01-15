export async function fetchPostJSON(url: string, data?: {}) {
  try {
    //Default options are marked with *
    const response = await fetch(url, {
      method: "POST", //*GET, POST, PUT, DELETE, etc
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data || {}),
    })
    return await response.json()
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw err
  }
}