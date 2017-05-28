
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function prepareTimeline() {
    var items = document.querySelectorAll(".timeline li");
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}

function swapStyles(div, a, b) {
    div.classList.remove(a);
    div.classList.add(b);
}

window.addEventListener("scroll", prepareTimeline);
window.addEventListener("load", function() {
    var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var message = document.getElementById("message");
    var email = document.getElementById("email");
    var alert = document.getElementById('alert');

    email.addEventListener("change", function(event) {
        var currentValue = email.value.trim();
        swapStyles(alert, 'alert-show', 'alert-hide');
        
        if(currentValue.length == 0) 
            return;

        if(isEmail.test(currentValue)) {
            swapStyles(email, 'form-error', 'form-success');
        } else {
            swapStyles(email, 'form-success', 'form-error');
        }
    });

    message.addEventListener("change", function(event) {
        var currentValue = message.value.trim();
        swapStyles(alert, 'alert-show', 'alert-hide');

        if(currentValue.length == 0) 
            return;

        if(currentValue.length > 0) {
            swapStyles(message, 'form-error', 'form-success');
        } else {
            swapStyles(message, 'form-success', 'form-error');
        }
    });

    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault();

        var messageText = message.value.trim();
        var address = email.value.trim();

        if(isEmail.test(address) && messageText.length > 0) {
            var body = {
                subject: "Reason: " + document.getElementById("reason").value,
                message: messageText,
                email: address,
                name: 'Unknown'
            };

            var http = new XMLHttpRequest();   
            http.open("POST", "http://williamsamtaylor.co.uk:3004/send");
            http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            http.send(JSON.stringify(body));

            swapStyles(alert, 'alert-hide', 'alert-show');
            message.classList.remove('form-success', 'form-error');
            email.classList.remove('form-success', 'form-error');
            message.value = "";
            email.value = "";
        }
    });

    zenscroll.setup(1000, -200); // ms, px

    var movedown = document.getElementById('movedown');
    movedown.addEventListener('click', function(event) {
        event.preventDefault();
        zenscroll.to(movedown);
    })

    prepareTimeline();
});

/*
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-96533413-4', 'auto');
ga('send', 'pageview');
*/