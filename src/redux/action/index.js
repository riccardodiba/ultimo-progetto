

export const search = 'search'

export const getSearch = (searchValue) => {
    return async (dispatch) => {
        try {
            const res = await fetch(
                "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
                searchValue,
                {
                    headers: {
                        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
                        "X-RapidAPI-Key":
                            "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
                    },
                }
            )
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                dispatch({
                    type: search,
                    payload: data.data,

                })
            } else {
                throw new Error("ops ricerca non trovata!")
            }
        } catch (error) {
            console.log("errore", error)
        }
    }
}

