
function generateData(data) {
    console.log('sent');
    const res = getData("http://localhost:3000/getData", {
        city: data.city,
        startDate: data.startDate,
        endDate: data.endDate,
    })
    return res;
}

// Retrieving data from server
const getData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    try {
        const res = await response.json();
        return res;
    } catch (err) {
        alert('Sorry we have no such city in our database')
        console.log("error", err)
    }
}

export {
    generateData
}