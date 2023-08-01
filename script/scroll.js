let lastKnownScrollPosition = 0;
const navbar = document.getElementById("navbar");
const main = document.getElementById("main");

function doSomething() {
    //Do something with the scroll position
    navbar.classList.add("sticky");
    main.classList.add("sticky");
}

function doSomethingReverse() {
    console.log("reverse");
    navbar.classList.remove("sticky");
    main.classList.remove("sticky");
}

function showList() {
    console.log(navbar.classList == "sticky");
}
setInterval(showList, 3000);

if (navbar.classList != "sticky") {
    document.addEventListener("scroll", (event) => {
        event.preventDefault();
        console.log("ini 2");
        let lastKnownScrollPosition = window.scrollY;
        console.log(lastKnownScrollPosition);

        if (lastKnownScrollPosition > 249) {
            console.log("masuk");
            doSomething();
            lastKnownScrollPosition = 10;
        }
        if (lastKnownScrollPosition <= 0) {
            doSomethingReverse();
        }
    });
}
