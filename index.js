    const URL = "http://localhost:3000/"

    // const search = document.getElementById("search")
    // search.addEventListener('submit', (e)=>handleSearch(e))

    const stateList = document.getElementById("state-dropdown")
    stateList.addEventListener('submit', (e)=>handleStateSubmit(e))
    
    const parksContainer = document.getElementById("parks-container")
    const photoContainer = document.getElementById("photo-container")
    const signUpForm = document.getElementById('sign-up')
    signUpForm.addEventListener("submit", (e) => postUser(e))
    const signUpDiv = document.getElementById('sign-up-div')

    function postUser(e){
        e.preventDefault()
        const username = e.target.username.value
        fetch(URL + "users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        })
        .then(r => r.json())
        .then(console.log)
    }

    function handleStateSubmit(e){
        e.preventDefault()
        const state = e.target.states.value
        fetch(URL + `park_search?query=${state}`)
        .then(res => res.json())
        .then(parks => iterateParks(parks))
    }

    function iterateParks(parks){
        parksContainer.innerHTML = ""
        for(const park of parks){
            buildLi(park)
        }
    }

    function buildLi(park){
        const card = document.createElement("div")
        card.className = "card"

        let image = park.images.split(" ").find(element => element.includes("url"))
        image = image.slice(8)
        image = image.substring(0, image.length - 3)

        card.innerHTML = `
        <div class="card-image">
            <figure class="image is-4by3">
            <img class="list-image"src="${image}" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content">
                <p class="title is-4">${park.name}</p>
            </div>
            </div>
        </div>
        <br>
        `
        parksContainer.appendChild(card)
        card.addEventListener('click', () => showPark(park))
    }

    function showPark(park){
        // photoContainer.innerHTML = ""
        // signUpDiv.innerHTML = ""
        let image = park.images.split(" ").find(element => element.includes("url"))
        image = image.slice(8)
        image = image.substring(0, image.length - 3)
        console.log(image)
        parksContainer.innerHTML = ""
        parkShow = document.createElement("div")
        parkShow.className = "card"
        parkShow.innerHTML = `
        <div class="card-image">
        <figure class="image is-4by3">
          <img class="list-image" src="${image}" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${park.name}</p>
            <p class="subtitle is-6">States: ${park.states}</p>
            <p> ${park.designation} </p>
          </div>
        </div>
        <div class="content">
          <p> Location: ${park.latlong}</p>
          <p class="title is-4">Description: ${park.description}</p>
          <p> Weather Info: ${park.weather_info}</p>
        </div>
      </div>
        `

        

        const reviewForm = document.createElement("form")
        reviewForm.id = "review"
        reviewForm.innerHTML = `
        <label> Username: </label><br>
        <input name="username" type="text"><br>
        <label> Review: </label><br>
        <input name="review" type="textarea"><br>
        <input type="submit">
        `
        reviewForm.addEventListener('submit', (e) => postReview(e))
        parksContainer.append(parkShow, reviewForm)
    }

    function postReview(e){
        e.preventDefault()
        const username = e.target.username.value
        const review = e.target.review.value 
        fetch(URL + "reviews")
    }
   
    // function handleSearch(e){
    //     e.preventDefault()
    //     const query = e.target.query.value
    //     fetch(PARKS_URL + `/`)
    //     //use that query thing from yesterday discussion question in fetch request
    // }
