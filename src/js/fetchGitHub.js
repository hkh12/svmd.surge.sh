const API_URL = 'https://api.github.com/graphql';
const TOKEN = '096ede9e192313e5b044092e8c63928fcee82620';

export default function fetch(query) {
  return window.fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`
    },
    body: JSON.stringify({
      query: `query {
        repository(owner: "hkh12", name: "svmd") {
          ${query}
        }
      }`
    })
  });
}
