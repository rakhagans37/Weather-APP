let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
    // Do something with the scroll position
    if (scrollPos >= 10) {
        document.getElementById("navbar").classList.add("sticky");
        document.getElementById("main").classList.add("sticky");
    } else {
        document.getElementById("navbar").classList.remove("sticky");
        document.getElementById("main").classList.add("sticky");
    }
}

document.addEventListener("scroll", (event) => {
    event.preventDefault();
    window.sc;
    lastKnownScrollPosition = window.scrollY;
    console.log(lastKnownScrollPosition);

    if (!ticking) {
        window.requestAnimationFrame(() => {
            doSomething(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});
