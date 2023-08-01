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

if (navbar.classList != "sticky") {
    document.addEventListener("scroll", (event) => {
        event.preventDefault();
        let lastKnownScrollPosition = window.scrollY;

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
