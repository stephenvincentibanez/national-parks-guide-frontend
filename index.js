    const URL = "http://localhost:3000/"

    const stateList = document.getElementById("state-dropdown")
    stateList.addEventListener('submit', (e)=>handleStateSubmit(e))
    
    const parksContainer = document.getElementById("parks-container")
    const photoContainer = document.getElementById("photo-container")
    const signUpForm = document.getElementById('sign-up')
    signUpForm.addEventListener("submit", (e) => postUser(e))
    const signUpDiv = document.getElementById('sign-up-div')
    const reviewContainer = document.getElementById("review-container")

    
    //CLICKING SUBMIT ON A STATE
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
    
    //BUILDS A CARD FOR EACH PARK IN A STATE
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
    
    //BUILDS SHOW PAGE WHEN A PARK IS CLICKED
    function showPark(park){
        // photoContainer.innerHTML = ""
        // signUpDiv.innerHTML = ""
        let image = park.images.split(" ").find(element => element.includes("url"))
        image = image.slice(8)
        image = image.substring(0, image.length - 3)
        parksContainer.innerHTML = ""
        parkShow = document.createElement("div")
        parkShow.id = park.id
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
        reviewContainer.innerHTML = ""
        getUsers()
        getReviews(park)
        const reviewHeader = document.createElement("h3")
        reviewHeader.textContent = "Reviews"
        parksContainer.appendChild(parkShow)
        reviewContainer.appendChild(reviewHeader)
    }

    //BUILDS REVIEW FORM ON THE SHOW PAGE FOR A PARK
    function buildReviewForm(users){
        let reviewForm = document.createElement("form")
        reviewForm.id = "review"
        const userLabel = document.createElement("label")
        userLabel.textContent = "Username: "
        const userSelect = document.createElement("select")
        userSelect.setAttribute("name", "username")
        for(const user of users){
            const userOption = document.createElement("option")
            userOption.textContent = user.username
            userOption.id = user.id
            userSelect.append(userOption)
        }
        const reviewLabel = document.createElement("label")
        reviewLabel.textContent = "Review: "
        
        const reviewText = document.createElement("input")
        reviewText.setAttribute("name", "review")
        reviewText.type = "textarea"
        
        const reviewSubmit = document.createElement("input")
        reviewSubmit.type = "submit"
        
        const br1 = document.createElement('br')
        const br2 = document.createElement('br')
        
        reviewForm.append(userLabel, userSelect, br1, reviewLabel, reviewText, br2, reviewSubmit)
        parksContainer.appendChild(reviewForm)
        reviewForm.addEventListener("submit", (e) => postReview(e))
    }

    //GRAB ALL USERS 
    function getUsers(){
        fetch(URL + "users")
        .then(r => r.json())
        .then(users => buildReviewForm(users))
    }
    
    //USER SIGNUP AND POST TO DATABASE
    function postUser(e, park, user){
        e.preventDefault()
        console.log(park)
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

    //POST REVIEW TO DB
    function postReview(e){
        e.preventDefault()
        const username = e.target.username.value
        const user_id = e.target.username[e.target.username.selectedIndex].id
        const review = e.target.review.value 
        const park_id = document.querySelector(".card").id
        fetch(URL + "reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username,
                comment: review,
                user_id: user_id,
                park_id: park_id
            })
        })
        .then(r => r.json())
        .then(review => appendReview(review))
        .then(()=>{(e.target.username.value = "");(e.target.review.value = "")})
    }

    //APPENDS REVIEW TO DOM AFTER POSTING TO DB 
    function appendReview(review){
        const reviewDiv = document.createElement("div")
        reviewDiv.className = "card-content"

        const userH4 = document.createElement("h4")
        userH4.innerText = `User: ${review.username}`

        const reviewP = document.createElement("p")
        reviewP.innerText = `Review: ${review.comment}`

        const updateBtn = document.createElement("button")
        updateBtn.textContent = "Update Review"
        updateBtn.addEventListener("click", (e) => handleUpdate(e))

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete Review"
        deleteBtn.addEventListener("click", (e) => handleDelete(review, e))

        reviewDiv.append(userH4, reviewP, updateBtn, deleteBtn)
        reviewContainer.appendChild(reviewDiv)
    }

    function handleUpdate(e){
        console.log(e.target)
    }

    function handleDelete(review, e){
        e.target.parentElement.remove()
        fetch(URL + `reviews/${review.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
    }
    
    // FETCH ALL REVIEWS
    function getReviews(park){
        fetch(URL + "reviews")
        .then(r => r.json())
        .then(reviews => iterateReviews(reviews, park))
    }
   
    function iterateReviews(reviews, park){
        for(const review of reviews){
            if (review.park_id === park.id){
            appendReview(review)
            }
        }
    }