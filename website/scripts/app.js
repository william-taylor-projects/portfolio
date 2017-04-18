function goto(url) {
    window.open(url, '_blank')
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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

    email.addEventListener("change", function(event) {
        var currentValue = email.value.trim();

        if(currentValue.length == 0) 
            return;

        if(validateEmail(email.value.trim())) {
            email.classList.add('form-success');
            email.classList.remove('form-error');
        } else {
            email.classList.add('form-error');
            email.classList.remove('form-success');
        }
    });

    message.addEventListener("change", function(event) {
        var currentValue = message.value.trim();

        if(currentValue.length > 0) {
            message.classList.add('form-success');
            message.classList.remove('form-error');
        } else {
            message.classList.add('form-error');
            message.classList.remove('form-success');
        }
    });

    button.addEventListener("click", function(event) {
        event.preventDefault();

        var messageText = message.value.trim();
        var address = email.value.trim();

        if(validateEmail(address) && messageText.length > 0) {
            var body = {
                subject: "Reason: " + reason.value,
                message: messageText,
                email: address,
                name: 'Unknown'
            };

            var http = new XMLHttpRequest();   
            http.open("POST", "http://williamsamtaylor.co.uk:3004/send");
            http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            http.send(JSON.stringify(body));

            message.classList.remove('form-success', 'form-error');
            email.classList.remove('form-success', 'form-error');
            message.value = "";
            email.value = "";
        }
    });

    var defaultDuration = 1000 // ms
    var edgeOffset = -200 // px

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