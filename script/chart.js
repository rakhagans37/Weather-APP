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

    //Print temperature day and night
    document.getElementById("day").textContent = response.list[0].temp.day;
    document.getElementById("night").textContent = response.list[0].temp.night;
    return value;
}
export function printChart(latitude, longitude) {
    //Print day temp
    getSevenDaysDetails(latitude, longitude).then((response) => {
        document.getElementById("timeline-chart").textContent = "";
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
                type: "category",
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
                labels: {
                    show: true,
                    rotate: -45,
                    rotateAlways: false,
                    hideOverlappingLabels: true,
                    showDuplicates: false,
                    trim: false,
                    minHeight: undefined,
                    maxHeight: 120,
                    style: {
                        colors: [],
                        fontSize: "15px",
                        fontFamily: "Poppins",
                        fontWeight: 500,
                        cssClass: "apexcharts-xaxis-label",
                    },
                },
                axisBorder: {
                    show: true,
                    color: "#78909C",
                    height: 1,
                    width: "100%",
                    offsetX: 0,
                    offsetY: 0,
                },
                axisTicks: {
                    show: true,
                    borderType: "solid",
                    color: "#78909C",
                    height: 2,
                    offsetX: 0,
                    offsetY: 0,
                },
                crosshairs: {
                    show: true,
                    width: 1,
                    position: "back",
                    opacity: 1,
                    stroke: {
                        color: "#21005D",
                        width: 2,
                        dashArray: 5,
                    },
                    fill: {
                        type: "solid",
                        color: "#21005D",
                    },
                    dropShadow: {
                        enabled: false,
                        top: 0,
                        left: 0,
                        blur: 1,
                        opacity: 0.4,
                    },
                },
            },
            yaxis: {
                tickAmount: 3,
                labels: {
                    show: true,
                    align: "right",
                    style: {
                        colors: [],
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        cssClass: "apexcharts-yaxis-label",
                    },
                    offsetX: 0,
                    offsetY: 4,
                    rotate: 0,
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
