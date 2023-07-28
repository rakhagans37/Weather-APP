function getLocation(latitude, longitude) {
    const param = new URLSearchParams();
    param.append("lat", latitude);
    param.append("lon", longitude);
    param.append("limit", 1);
    param.append("appid", "5e12c37e2ff0623c3469032dd5ba1d6b");

    const request = new Request(
        `http://api.openweathermap.org/geo/1.0/reverse?${[param]}`
    );

    try {
        const response = fetch(request);
        response
            .then((response) => response.json())
            .then((responseJSON) => {
                document.getElementById(
                    "location"
                ).textContent = `${responseJSON[0].name}, ${responseJSON[0].state}`;
            });
    } catch (error) {
        console.log(`Error Occured = ${error}`);
    }
}

function getTemp(latitude, longitude) {
    const param = new URLSearchParams();
    param.append("lat", latitude);
    param.append("lon", longitude);
    param.append("limit", 1);
    param.append("appid", "5e12c37e2ff0623c3469032dd5ba1d6b");
    param.append("units", "metric");

    const request = new Request(
        `https://api.openweathermap.org/data/2.5/weather?${param}`
    );

    try {
        const response = fetch(request);
        response
            .then((response) => response.json())
            .then((responseJSON) => {
                document.getElementById("temp").textContent += `${Math.round(
                    responseJSON.main.temp
                )}`;
            });
    } catch (error) {
        console.log(`Error Occured = ${error}`);
    }
}

navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getLocation(latitude, longitude);
    getTemp(latitude, longitude);
});
