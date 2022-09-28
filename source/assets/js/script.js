// ----------------------------------------------------------------------
// Scroll to top FAB
// ----------------------------------------------------------------------
const scrollBtn = document.getElementById("scroll-top-fab");

function btnShowHide() {
    if (window.scrollY > 100) {
        scrollBtn.classList.remove("mdui-fab-hide");
    } else {
        scrollBtn.classList.add("mdui-fab-hide");
    }
}

function scrollTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

window.addEventListener("scroll", btnShowHide);
scrollBtn.addEventListener("click", scrollTop);
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Drawer Dark Mode Toggle
// ----------------------------------------------------------------------
const targetElement = document.getElementsByTagName("body")[0];
const toggleButton = document.getElementById("dark-mode-toggle");
const keyName = "dark-mode";
let darkMode = localStorage.getItem(keyName);

function enableDarkMode() {
    targetElement.classList.add("mdui-theme-layout-dark");
    
    if (document.getElementById("footer-card") !== null) {
        document.getElementById("footer-card").classList.add("mdui-theme-layout-dark");
        document.getElementById("footer-card").classList.remove("mdui-color-theme");
    }
    
    localStorage.setItem(keyName, "enabled");
};

function disableDarkMode() {
    targetElement.classList.remove("mdui-theme-layout-dark");

    if (document.getElementById("footer-card") !== null) {
        document.getElementById("footer-card").classList.remove("mdui-theme-layout-dark");
        document.getElementById("footer-card").classList.add("mdui-color-theme");
    }

    localStorage.setItem(keyName, "disabled");
};

function setDarkMode() {
    darkMode = localStorage.getItem(keyName);

    if (darkMode === null) {
        localStorage.setItem(keyName, "enabled");
    }

    if (darkMode === "disabled") {
        disableDarkMode();
    }
}

setDarkMode();

toggleButton.addEventListener("click", function() {
    darkMode = localStorage.getItem(keyName);

    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// Get Internet State
// ----------------------------------------------------------------------
const getNetworkState = function() {
    window.addEventListener("online", function() {
        mdui.snackbar({
            position: 'left-bottom',
            message: 'Internet restored',
            buttonText: 'OK',
            closeOnButtonClick: true,
            closeOnOutsideClick: false
        });
    });

    window.addEventListener("offline", function() {
        mdui.snackbar({
            position: 'left-bottom',
            message: 'Internet disconnected',
            buttonText: 'OK',
            closeOnButtonClick: true,
            closeOnOutsideClick: false
        });
    });
};

window.addEventListener("load", getNetworkState);
// ----------------------------------------------------------------------
