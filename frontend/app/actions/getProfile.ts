export async function getProfile() {
    const resp = await fetch(`http://localhost:8000/api/me/`, {
      credentials: 'include',
    });
    const data = await resp.json();
    return data
  }
  