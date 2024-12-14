var input = document.getElementById("textbox");
      console.log(input);
      var btn = document.getElementById("btn");
      console.log(btn);
      
      var imgs = document.getElementById("container");
      var title = document.getElementById("title");
      var year = document.getElementById("year");
      var awards = document.getElementById("awards");
      var actors = document.getElementById("actors");
      var director = document.getElementById("director");
      var rating = document.getElementById("rating");
      var boxoffice = document.getElementById("boxoffice");
      var img = document.createElement("img");
      
      console.log(title, year, awards, actors, director, rating, boxoffice);
     
      async function getdata(name) {
          try {
              var fetchdata = await fetch(`https://www.omdbapi.com/?t=${name}&apikey=76d079f0`);
              var data = await fetchdata.json();
    
              console.log(fetchdata);
              console.log(data);
              // console.log(data.Title);
              
              title.innerText = data.Title || " ";
              year.innerText = data.Released || " ";
              awards.innerText = data.Awards || " ";
              actors.innerText = data.Actors || " ";
              director.innerText = data.Director || " ";
              rating.innerText = data.Ratings[0]?.Value || " ";
              boxoffice.innerText = data.BoxOffice || "";
              
              img.src = data.Poster || " ";
              imgs.appendChild(img);
              
              console.log(img);
          } catch (err) {
              console.log("Movie not found");
          }
      }
  
      btn.addEventListener("click", async () => {
          var moviename = input.value;
          console.log(moviename);
          await getdata(moviename);
    
    // Show the container after fetching data
    if (moviename) {
        imgs.style.display = 'block'; // Show the container
    }
      });
      