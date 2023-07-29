// Function, Async, and API call

function locAPI(latitude, longitude) {
    const param = new URLSearchParams();
    param.append("lat", latitude);
    param.append("lon", longitude);
    param.append("limit", 5);
    param.append("appid", "5e12c37e2ff0623c3469032dd5ba1d6b");
    param.append("lang", "id");

    const request = new Request(
        `https://api.openweathermap.org/geo/1.0/reverse?${[param]}`
    );

    try {
        const response = fetch(request);
        return response.then((response) => response.json());
    } catch (error) {
        console.log(`Error Occured = ${error}`);
    }
}

function forecastAPI(latitude, longitude, city) {
    const param = new URLSearchParams();

    //Untuk mengambil parameter yang tepat untuk digunakan dalam URL
    if (latitude === null || longitude === null) {
        param.append("q", city);
    } else {
        param.append("lat", latitude);
        param.append("lon", longitude);
    }

    //Parameter wajib dalam URL
    param.append("appid", "5e12c37e2ff0623c3469032dd5ba1d6b");
    param.append("units", "metric");
    param.append("lang", "id");

    //Membuat request ke server
    const request = new Request(
        `https://api.openweathermap.org/data/2.5/weather?${param}`
    );
    try {
        const response = fetch(request);
        return response.then((response) => response.json());
    } catch (error) {
        console.log(`Error Occured = ${error}`);
    }
}

function uvAPI(latitude, longitude) {
    const param = new URLSearchParams();
    param.append("lat", latitude);
    param.append("lng", longitude);

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", "openuv-24jv0rlkm8fmi8-io");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = fetch(
            `https://api.openuv.io/api/v1/uv?${param}`,
            requestOptions
        );
        return response.then((response) => response.json());
    } catch (error) {
        console.log(`ERROR : ${error}`);
    }
}

function makeTime() {
    const time = new Date();
    document.getElementById("date-time").textContent = `${time.toLocaleString(
        "default",
        { month: "long" }
    )} ${time.getDate()}, ${time.toLocaleTimeString()}`;
}

async function getTemp(latitude, longitude, city) {
    const response = await forecastAPI(latitude, longitude, city);
    return response;
}
async function getLoc(latitude, longitude) {
    const response = await locAPI(latitude, longitude);
    return response;
}
async function getUV(latitude, longitude) {
    const response = await uvAPI(latitude, longitude);
    return response;
}

function printData(response) {
    //Print current data temperature
    document.getElementById("temp").textContent = Math.round(
        response.main.temp
    );

    //Print current data feels temperature
    document.getElementById("feels-temp").textContent = Math.round(
        response.main.feels_like
    );

    //Print current simbol forecast
    document
        .getElementById("forecast-icon")
        .setAttribute(
            "src",
            `image/forecast icon/${response.weather[0].main}.png`
        );

    //Print current deskripsi forecast ex: clouds, sunny, etc
    document.getElementById("forecast-desc").textContent =
        response.weather[0].main;

    //Print current wind speed
    document.getElementById("wind").textContent = response.wind.speed + " m/s";

    //Print current pressure
    document.getElementById("pressure").textContent =
        response.main.pressure + " hPa";

    //Print current rain
    const h1 = "1h";
    document.getElementById("rain-volume").textContent =
        (response?.rain?.["1h"] ?? 0) + " mm";

    // try {
    //     getUV(response.coord.lat, response.coord.lon).then((responseUV) => {
    //         document.getElementById("uv-index").textContent =
    //             responseUV.result.uv;
    //     });
    // } catch (error) {
    //     console.log(`Error : ${error}`);
    // }
}
function printLoc(response) {
    document.getElementById("location").textContent = `${
        response[0].local_names.id ?? response[0].name
    }, ${response[0].state ?? response[0].country}`;
}

function getAllData() {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getTemp(latitude, longitude).then((response) => {
            printData(response);
        });
        getLoc(latitude, longitude).then((response) => {
            printLoc(response);
        });
    });
}

//Javascript procedural
document.getElementById("city").addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;

    //Memanggil async function untuk get data
    getTemp(null, null, city).then((response) => {
        printData(response);
        getLoc(response.coord.lat, response.coord.lon).then((response) => {
            printLoc(response);
        });
        // getUV(response.coord.lat, response.coord.lon).then((responseUV) => {
        //     document.getElementById("uv-index").textContent =
        //         responseUV.result.uv;
        // });
    });
    document.getElementById("city-input").value = "";
});

setInterval(makeTime, 1000);
getAllData();
