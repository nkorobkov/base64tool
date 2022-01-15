function padBase64(input) {
    var segmentLength = 4;
    var stringLength = input.length;
    var diff = stringLength % segmentLength;

    if (!diff) {
        return input;
    }

    var padLength = segmentLength - diff;
    var paddedStringLength = stringLength + padLength;
    var buffer = input;

    while (padLength--) {
        buffer += '='
    }

    return buffer.toString();
}

function plainToBase64(plaintext) {
    return btoa(plaintext);
}

function plainToBase64url(plaintext) {
    return btoa(plaintext).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlToPlain(base64url) {
    try {
        return atob(padBase64(base64url).replace(/\-/g, "+").replace(/_/g, "/"));
    } catch (e) {
        return '*** wrong format ***';
    }
}

function base64ToPlain(base64) {
    try{
        return atob(padBase64(base64));
    } catch (e) {
        return '*** wrong format ***';
    }
}

function base64ToBase64url(base64) {
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlToBase64(base64url) {
    return base64url.replace(/\-/g, "+").replace(/_/g, "/");
}

function hide(elements) {
    elements.forEach(function (e) {
        e.style = "opacity: 0";
    });
}

function show(elements) {
    elements.forEach(function (e) {
        e.style = "opacity: 1";
    });
}

function updateUrl(base64) {
    window.history.replaceState(null, 'null', '?base64='+base64);
}

var plain = document.getElementById('plaintext');
var base64 = document.getElementById('base64');
var base64url = document.getElementById('base64url');

var copyPlain = document.getElementById('copy-plain');
var copyBase64 = document.getElementById('copy-base64');
var copyBase64url = document.getElementById('copy-base64url');
var copyLink = document.getElementById('copy-link');

var labels = document.querySelectorAll('.textarea-label');
var buttons = document.querySelectorAll('.btn');


plain.onkeyup = function(e) {
    var value = plain.value.trim();
    if (value.length > 0) {
        show(labels);show(buttons);
    } else {
        hide(labels);hide(buttons);
    }

    base64.value = plainToBase64(value);
    base64url.value = plainToBase64url(value);
    updateUrl(base64url.value);
}

base64.onkeyup = function(e) {
    var value = base64.value.trim();
    if (value.length > 0) {
        show(labels);show(buttons);
    } else {
        hide(labels);hide(buttons);
    }

    plain.value = base64ToPlain(value);
    base64url.value = base64ToBase64url(value);
    updateUrl(base64url.value);
}

base64url.onkeyup = function(e) {
    var value = base64url.value.trim();
    if (value.length > 0) {
        show(labels);show(buttons);
    } else {
        hide(labels);hide(buttons);
    }

    plain.value = base64urlToPlain(value);
    base64.value = base64urlToBase64(value);

    updateUrl(value);

}

plain.onclick = function(e) {
    plain.select();
}
base64.onclick = function(e) {
    base64.select();
}
base64url.onclick = function(e) {
    base64url.select();
}

copyPlain.onclick = function(e) {
    plain.select();
    document.execCommand("Copy");
    copyPlain.selectionEnd = copyPlain.selectionStart;
    plain.blur();
}
copyBase64.onclick = function(e) {
    base64.select();
    document.execCommand("Copy");
    base64.selectionEnd = base64.selectionStart;
    base64.blur();
}
copyBase64url.onclick = function(e) {
    base64url.select();
    document.execCommand("Copy");
    base64url.selectionEnd = base64url.selectionStart;
    base64url.blur();
}
copyLink.onclick = function(e) {
    console.log('x')
    navigator.clipboard.writeText(window.location.href);
}

window.onload = (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("base64") && base64url.value != urlParams.get("base64")){
        base64url.value = urlParams.get("base64");
        base64url.onkeyup();
    }
}