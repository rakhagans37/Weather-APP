export function dayForecast(latitude, longitude, city) {
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
        `https://api.openweathermap.org/data/2.5/forecast/daily?${param}`
    );
    try {
        const response = fetch(request);
        return response.then((response) => response.json());
    } catch (error) {
        console.log(`Error Occured = ${error}`);
    }
}
export async function getSevenDaysDetails(latitude, longitude) {
    const response = await dayForecast(latitude, longitude);
    const value = [[], [], [], []];
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    for (let i = 0; i < 7; i++) {
        value[0].push(response.list[i].temp.day);
        value[1].push(response.list[i].temp.min);
        value[2].push(response.list[i].temp.max);
        value[3].push(
            weekday[
                new Date(Number(response.list[i].dt + "000")).getDay()
            ].substring(0, 3)
        );
    }
    return value;
}

export function printChart(latitude, longitude) {
    getSevenDaysDetails(latitude, longitude).then((response) => {
        const data = [];
        data.push(response);

        console.log(data);
        let options = {
            tooltip: {
                x: {
                    show: false,
                },
                style: {
                    fontSize: 14,
                    fontFamily: "Poppins",
                },
                onDatasetHover: {
                    highlightDataSeries: true,
                },
            },
            animations: {
                enabled: true,
                easing: "linear",
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 350,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                },
            },
            chart: {
                toolbar: {
                    show: false,
                },
                type: "area",
                height: 180,
                foreColor: "#000",
                dropShadow: {
                    enabled: true,
                    enabledSeries: [0],
                    top: -2,
                    left: 2,
                    blur: 5,
                    opacity: 0.06,
                },
            },
            colors: ["rgba(224, 0, 0, 1)", "#000", "rgba(0, 103, 223, 1)"],
            stroke: {
                curve: "smooth",
                width: 4,
            },
            dataLabels: {
                enabled: false,
            },
            series: [
                {
                    name: "Max",
                    data: data[0][2],
                },
                {
                    name: "Avg",
                    data: data[0][0],
                },
                {
                    name: "Min",
                    data: data[0][1],
                },
            ],
            markers: {
                size: 0,
                strokeColor: "#FFF",
                strokeWidth: 2,
                strokeOpacity: 1,
                fillOpacity: 1,
                colors: "#21005D",
                hover: {
                    size: 6,
                },
            },

            xaxis: {
                type: "text",
                categories: data[0][3],
                axisBorder: {
                    show: true,
                },
                axisTicks: {
                    show: true,
                },
                lines: {
                    show: true,
                },
            },
            yaxis: {
                labels: {
                    offsetX: 0,
                    offsetY: 4,
                },
            },
            grid: {
                borderColor: "rgba(0, 0, 0, 0.13)",

                padding: {
                    left: 23,
                    right: 23,
                },
            },

            fill: {
                type: "gradient",
                colors: [
                    "rgba(87, 0, 0, 1)",
                    "rgba(18, 0, 69, 0.8)",
                    "rgba(0, 14, 87, 1)",
                ],
            },
        };

        var chart = new ApexCharts(
            document.querySelector("#timeline-chart"),
            options
        );

        chart.render();
    });
}
