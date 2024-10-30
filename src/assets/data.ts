
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', import.meta.env.VITE_SERVER_URL);

export const fetchOptions: RequestInit = {
    method: 'GET',
    redirect: "follow",
    credentials: "include",
    headers
};