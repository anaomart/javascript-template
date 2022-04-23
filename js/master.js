// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Array of Elements
let imgsArray = [
    "wallpaperflare.com_wallpaper.jpg",
    "zed.jpg",
    "zed-2553165.jpg",
    "zed-2553189.jpg",
];
let backgroundOption = true;
let backgroundInterval;

// Settings Box

//check if ther color in local storage
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
}

document.querySelector(".toggle .fa-gear").onclick = function() {
    // spin the gear

    this.classList.toggle("fa-spin");
    //Open settings box

    let settingsBox = document.querySelector(".settings-box");
    settingsBox.classList.toggle("open");
};

// Color Switching
let colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach((li) => {
    //Loop on Li (colors)
    li.addEventListener("click", (e) => {
        document.querySelectorAll(".option-box li.active").forEach((e) => {
            // remove active class
            e.classList.remove("active");
        });

        // change main color in root
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );

        // set the color to localStorage
        localStorage.setItem("color_option", e.target.dataset.color);
        // set active class on only one element
        e.target.classList.add("active");
    });
});

// switch Random Background option
let randomBackground = document.querySelectorAll(".random-background span ");
randomBackground.forEach((span) => {
    span.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        if (e.target.classList.contains("yes")) {
            backgroundOption = true;

            console.log(backgroundOption);
        } else {
            backgroundOption = false;

            clearInterval(backgroundInterval);
        }
        //
        changeBackground();
        e.target.classList.add("active");
    });
});

function changeBackground() {
    if (backgroundOption == true) {
        // change the background Randomly every (4s)
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            // Change the backgroundImage url
            landingPage.style.backgroundImage = `url('images/${imgsArray[randomNumber]}')`;

            // save backgroundImage url  in localStorage
            localStorage.setItem(
                "backgroundImage",
                `images/${imgsArray[randomNumber]}`
            );
        }, 4000);
    }
}
changeBackground();

let imgsOptions = document.querySelectorAll(".images img");
imgsOptions.forEach((imgs) => {
    imgs.addEventListener("click", (img) => {
        landingPage.style.backgroundImage = `url(${img.target.getAttribute(
            "src"
        )})`;
        localStorage.setItem(
            "backgroundImage",

            `${img.target.getAttribute("src")}`
        );

        backgroundOption = false;

        clearInterval(backgroundInterval);

        document.querySelector(".random-background .no").classList.add("active");
        document
            .querySelector(".random-background .yes")
            .classList.remove("active");
    });
});

// Check if there's background option in localStorage and setting if there's
if (localStorage.getItem("backgroundImage")) {
    landingPage.style.backgroundImage = `url(${localStorage.getItem(
        "backgroundImage"
    )})`;
    clearInterval(backgroundInterval);
}
// OUr skills Section -
let ourSkills = document.querySelector(".skill-box");

window.onscroll = function() {
    // skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //outer height
    let skillOuterHeight = ourSkills.offsetHeight;

    let windowHeight = window.innerHeight;

    let windowScrollTOp = this.pageYOffset;

    if (windowScrollTOp > skillsOffsetTop + skillOuterHeight - windowHeight) {
        let allSkills = document.querySelectorAll(
            ".skill-box .skill-progress span"
        );

        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// Gallery Section

// pop up  images

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    img.addEventListener("click", () => {
        //create overlay
        var overLay = document.createElement("div");

        //give it class name
        overLay.className = "popup-overlay";

        // append child to the page
        document.body.appendChild(overLay);

        //create the popup
        let popUp = document.createElement("div");

        //give popup class name
        popUp.className = "popup";

        //create pop image
        let popUpImage = document.createElement("img");
        popUpImage.setAttribute("src", img.src);

        //add image to the popup
        popUp.appendChild(popUpImage);

        overLay.appendChild(popUp);

        overLay.addEventListener("click", (layer) => {
            overLay.remove();
        });
    });
});

// Bullets section

let allBullets = document.querySelectorAll('.bullet')
scrollTo(allBullets);


function scrollTo(elements) {
    elements.forEach(ele => {
        ele.addEventListener('click', e => {
            e.preventDefault();
            console.log(`.${e.target.dataset.section}`)
            document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({ behavior: 'smooth' })
        })
    })

}

function scrollTo2(elements) {
    elements.forEach(ele => {
        ele.addEventListener('click', e => {
            e.preventDefault();
            console.log(e.target.className)
            console.log(`.${e.target.getAttribute('data-section')}`)
            document.querySelector(`.${e.target.getAttribute('data-section')}`).scrollIntoView({ behavior: 'smooth' })
        })
    })

}
let navigation = document.querySelectorAll('.nav li a');
scrollTo2(navigation);
console.log(navigation[0].getAttribute('data-section'))

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active");
    })
    ev.target.classList.add("active");
}

let bulletSpan = document.querySelectorAll('.bullets-option span');
console.log(bulletSpan);
let bulletsContainer = document.querySelector('.nav-bullets');
console.log(bulletsContainer)

bulletSpan.forEach(span => {

    span.addEventListener('click', e => {

        if (span.dataset.display == 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets-option', 'block')
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets-option', 'none')

        }

        handleActive(e);

    })
})

// toggle menu 

let toggle = document.querySelector('.toggle-menu');
console.log(toggle)
let tLinks = document.querySelector('.nav');

toggle.onclick = function() {
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");

}