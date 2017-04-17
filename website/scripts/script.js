function goto(url) {
    window.open(url, '_blank')
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function prepTimeline() {
    var items = document.querySelectorAll(".timeline li");

    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}

function onLoad() {
    var button = document.getElementById("submit");
    var message = document.getElementById("message");
    var email = document.getElementById("email");
    var reason = document.getElementById("reason");
    var movedown = document.getElementById('movedown');

    button.addEventListener("click", function(event) {
        event.preventDefault();

        console.log(message.value);
        console.log('Email', email.value);
        console.log('Reason', reason.value);
    });

    var defaultDuration = 1000 // ms
    var edgeOffset = 44 // px
    zenscroll.setup(defaultDuration, edgeOffset);

    movedown.addEventListener('click', function(event) {
        event.preventDefault();
        zenscroll.to(movedown);
    })

    prepTimeline();
}

window.addEventListener("load", onLoad);
window.addEventListener("scroll", prepTimeline);

// Google Analytics / disable if running from localhost
if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-96533413-4', 'auto');
    ga('send', 'pageview');
}