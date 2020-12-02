
    const PARKS_URL = "http://localhost:3000/"
    // const map = document.getElementById("map")
    // map.addEventListener('click', (e)=>handleMapClick(e))
    const search = document.getElementById("search")
    search.addEventListener('submit', (e)=>handleSearch(e))
    const stateList = document.getElementById("state-dropdown")
    stateList.addEventListener('submit', (e)=>handleSubmit(e))
    
    function getParks(){
        fetch(PARKS_URL)
        .then(res => res.json())
        // .then(parks => iterateParks(parks))
        .then(console.log)
    }
    getParks()

    // function iterateParks(parks){
    //     for(const park of parks){
    //         buildLi(park)
    //     }
    // }

    // function buildLi(park){
    //     const ul = document.getElementById("park-list")
    //     const li = document.createElement("li")
    //     li.innerHTML = park.name
    //     ul.appendChild(li)
    // }

    function handleSubmit(e){
        e.preventDefault()
        const state = e.target.states.value
        fetch(PARKS_URL + `park_search?query=${state}`)
        .then(res => res.json())
        .then(console.log)
    }

    // function handleMapClick(e){
  
    //     console.log(e.target)
    //     console.log(e.target.textContent)
    //     if (e.target.textContent === park.states){
    //         buildLi(park)
    //     } 
    //     // if the innerText of target == Park.states, show those parks in an li
    //     //make a fetch function that changes depending on which state is clicked?
    // }
   
    function handleSearch(e){
        e.preventDefault()
        const query = e.target.query.value
        fetch(PARKS_URL + `/`)
        //use that query thing from yesterday discussion question in fetch request
    }
