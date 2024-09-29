const apiCall = async (method: string, prompt: string) => {
    const url = 'https://chatgpt-42.p.rapidapi.com/texttoimage';
    const options = {
        method,
        headers: {
        'x-rapidapi-key': process.env.NEXT_PROTRAIT_API_KEY || '',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: `create a portrait of ${prompt}`,
            width: 512,
            height: 512
        })
    };
    const response = await fetch(url, options);
    const res = await response.text();
    return JSON.parse(res);
    }

export default apiCall;