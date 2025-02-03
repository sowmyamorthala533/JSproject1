
const API_URL = "http://localhost:3000/users";

// Fetch users from JSON server
async function fetchUsers() {
    const response = await fetch(API_URL);
    return await response.json();
}

// Register functionality
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        // Store in localStorage
        let localUsers = JSON.parse(localStorage.getItem("users")) || [];
        localUsers.push({ username, password });
        localStorage.setItem("users", JSON.stringify(localUsers));

        // Update JSON server
        fetch(API_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }) .then((response) => {
            // Check if the response is not OK (e.g., server error)
            if (!response.ok) {
                throw new Error("Failed to register user on the server");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("An error occurred during registration. Please try again.");
        });

    alert("User registered successfully! Redirecting to login page...");
    window.location.href = "login.html";
});
}
//Guest Login
document.addEventListener("DOMContentLoaded", function() {
    const guestLogin = document.querySelector(".guestlogin");

    if (guestLogin) {
        guestLogin.addEventListener("click", function() {
            console.log("Button Clicked! Redirecting..."); // Debugging
            window.location.href = "homepage.html"; // Redirect on click
        });
    } else {
        console.error("Guest login button not found!");
    }
});


// Login functionality
const loginForm = document.getElementById("login-form");
if (loginForm) {
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();  const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Check in localStorage
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isLocalUser = localUsers.some(
        (user) => user.username === username && user.password === password
    );

    // Check in JSON server
    try {
        const users = await fetchUsers();
        const isServerUser = users.some(
            (user) => user.username === username && user.password === password
        );

        if (isLocalUser || isServerUser) {
            alert("Login successful! Redirecting to main page...");
            window.location.href = "homepage.html"; // Create a index.html for the next page
        } else {
            alert("Invalid username or password!");
        }
    } catch (error) {
        console.error(error);
        // alert("An error occurred during login. Please try again.");
        window.location.href = "homepage.html";
    }
});
}
"use strict";
//starting the home page
const header=document.querySelector("header");
const menus=document.querySelector(".menus");
const sliders=document.querySelectorAll(".slide");
const LeftBtn=document.getElementById("Left");
const SliderContentEL=document.querySelectorAll(".slider-content");
const RightBtn=document.getElementById("right");

window.addEventListener("scroll",()=>{
    if(document.documentElement.scrollTop>20){
        menus.classList.add("sticky")
    }
    else{
        menus.classList.remove("sticky")
    }
})
let activeSlide=3;
//FOR setting the background of the body ,this function sets the background image of the body based on the backgroung image of sliders based on index
function setBgBody(){
    header.style.backgroundImage=sliders[activeSlide].style.backgroundImage;
}
setBgBody();

function setActiveSlide(){
    sliders.forEach((slides)=>slides.classList.remove("active"));//if we donot remove the active slide,already we have declared the active in index file for one slide ,now it mat get 2 or 3 slides at a time
    sliders[activeSlide].classList.add("active");//adding active for the current slide and classlist is used for accessing methods like add,remove in  a easier way
}
//set content
function setContent(){
    SliderContentEL.forEach((slidersContents)=>{
        slidersContents.classList.remove("active")
    })
    SliderContentEL[activeSlide].classList.add("active")
    console.log(SliderContentEL)
}
RightBtn.addEventListener("click",()=>{
    nextSlide()
    setBgBody();
    setActiveSlide();
    setContent();
});
LeftBtn.addEventListener("click",()=>{
    PreviousSlide()
    setBgBody();
    setActiveSlide();
    setContent();
});
function nextSlide(){
    activeSlide++;
    if(activeSlide>sliders.length-1){
        activeSlide=0;
    }
}
function PreviousSlide(){
    activeSlide--;
    if(activeSlide<0){
        activeSlide=sliders.length-1
    }
}
/*setInterval(()=>{
    nextSlide();
    setBgBody();
    setActiveSlide();
    setContent();
},1000)*/