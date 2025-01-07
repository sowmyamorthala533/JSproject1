"use strict";
const SearchEL=document.getElementById("search")
const formEL=document.getElementById("form")
const MoviesContainer=document.querySelector(".movies-details")
const PaginationsEL=document.querySelectorAll('.paginations ul li')
const TvShowsContainer=document.querySelector(".Tv-details")
//cbe386797cdd903b2235cf394e67f722
//https://image.tmdb.org/t/p/w1280
//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cbe386797cdd903b2235cf394e67f722
const MoviesAPI="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cbe386797cdd903b2235cf394e67f722&page=1";
const imagePath="https://image.tmdb.org/t/p/w1280";
const searchUrl='https://api.themoviedb.org/3/search/movie?api_key=cbe386797cdd903b2235cf394e67f722&query="';
const TvShowsAPI=
"https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=cbe386797cdd903b2235cf394e67f722&page=1";
const searchTvShows='https://api.themoviedb.org/3/search/tv?api_key=cbe386797cdd903b2235cf394e67f722&query="';

getMovies(MoviesAPI);


//get movie function
async function getMovies(url){
    try{
        const result=await fetch(url);
        const data=await result.json()
        showMovies(data.results);
    }catch(error){
    }
}
//display movies inside Html
 function showMovies(movies){
  MoviesContainer.innerHTML="";
  movies.forEach((movie)=>{
    const{title,poster_path,vote_average,release_date}=movie
   const MoviesDisplay=document.createElement("div")
 MoviesDisplay.classList.add("movies");
 MoviesDisplay.innerHTML=` <img src="${imagePath+poster_path}" alt="">
 <p class="movie-title">${title}</p>
 <div class="short-des">
    <p class="year">Date : ${release_date}</p>
    <p class="rating">Vote : ${vote_average}</p>
 </div>` ;
 MoviesContainer.appendChild(MoviesDisplay);
 });
 }
 //search element
 formEL.addEventListener("submit",(e)=>{
    e.preventDefault();
    const  searchTerm=SearchEL.value;
    if(searchTerm && searchTerm!==""){
        getMovies(searchUrl+searchTerm);
        getTvShows(searchTvShows+searchTerm);
        SearchEL.value=""
    }
   else{
    window.location.reload();
   }
 })
//paginations
 PaginationsEL.forEach((pages,index)=>{
    pages.addEventListener("click",()=>{
        if(getMovies){
          getMovies(MoviesAPI+index)
          
        }
        getTvShows(TvShowsAPI+index)
    })
 })

 //tvShows
 getTvShows(TvShowsAPI);

//get movie function
async function getTvShows(url){
    try{
        const result=await fetch(url);
        const data=await result.json()
        showTvShows(data.results);
        console.log(result)
    }catch(error){
    }
}
function showTvShows (tvShows){
  TvShowsContainer.innerHTML= "";
  tvShows.forEach((tvShow)=>{
    const {name,poster_path,vote_average,first_air_date}=tvShow;
    const tvShowsDisplay=document.createElement("div");
    tvShowsDisplay.classList.add("tvShows");
    tvShowsDisplay.innerHTML=`<img src="${imagePath + poster_path}" alt="">
      <p class="movie-title">${name}</p>
      <div class="short-des">
        <p class="year">Date: ${first_air_date || "N/A"}</p>
        <p class="rating">Vote: ${vote_average || "N/A"}</p>
      </div>`;
      TvShowsContainer.appendChild(tvShowsDisplay);
  
  })
}


// hamburger menu section//
// Select the hamburger icon and nav-links
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Add click event to toggle the "active" class
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
