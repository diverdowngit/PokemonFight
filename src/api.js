const getApiData = (url) => {
    try {
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Api call failed")
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export { getApiData };