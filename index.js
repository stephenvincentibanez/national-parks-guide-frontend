    const URL = "http://localhost:3000/"

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
        .then(e.target.username.value = "")
        .then(alert("User succesfully created!"))
        
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
            buildCard(park)
        }
    }

    function buildCard(park){
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

        // const reviewForm = document.createElement("form")
        // reviewForm.id = "review"
        // reviewForm.innerHTML = `
        // <label> Username: </label><br>
        // <input name="username" type="text"><br>
        // <label> Review: </label><br>
        // <input name="review" type="textarea"><br>
        // <input type="submit">
        // `
        buildReviewForm()
        let reviewForm = document.getElementById("review")

        parksContainer.appendChild(parkShow)
        reviewForm.addEventListener('submit', (e) => postReview(e))
    }

    function buildReviewForm(users){
        console.log(users)
        let reviewForm = document.createElement("form")
        reviewForm.id = "review"
        const userLabel = document.createElement("label")
        userLabel.textContent = "Username: "
        const userSelect = document.createElement("select")

        for(const user of users){
            const userOption = document.createElement("option")
            userOption.textContent = user.username
            userSelect.append(userOption)
        }

        const reviewLabel = document.createElement("label")
        reviewLabel.textContent = "Review: "

        const reviewText = document.createElement("input")
        reviewText.type = "text"

        const reviewSubmit = document.createElement("input")
        reviewSubmit.type = "submit"

        reviewForm.appendChild(userLabel, userSelect, reviewLabel, reviewText, reviewSubmit)
        parksContainer.appendChild(reviewForm)
    }

    function getUsers(){
        fetch(URL + "users")
        .then(r => r.json())
        .then(users => buildReviewForm(users))
    }
    getUsers()

    function postReview(e){
        e.preventDefault()
        const username = e.target.username.value
        const review = e.target.review.value 
        fetch(URL + "reviews")
    }
   