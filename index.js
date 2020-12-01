
    const PARKS_URL = "http://localhost:3000/parks"
    const map = document.getElementById("map")
    map.addEventListener('click', (e)=>handleClick(e))
    const search = document.getElementById("search")
    search.addEventListener('submit', (e)=>handleSearch(e))
    
    function getParks(){
        fetch(PARKS_URL)
        .then(res => res.json())
        .then(parks => iterateParks(parks))
    }
    getParks()

    function iterateParks(parks){
        for(const park of parks){
            handleClick(park)
            // handleClick(park)
            // console.log(park)
        }
    }

    function buildLi(park){
        const ul = document.getElementById("list")
        const li = document.createElement("li")
        li.innerHTML = park.name
        ul.appendChild(li)
    }

    function handleClick(e, park){
        console.log(park)
        e.preventDefault()
        console.log(e.target.textContent)
        if (e.target.textContent === park.states){
            buildLi(park)
        } 
        // if the innerText of target == Park.states, show those parks in an li
        //make a fetch function that changes depending on which state is clicked?
    }
    handleClick()

    function handleSearch(e){
        e.preventDefault()
        const query = e.target.query.value
        fetch(PARKS_URL + `/`)
        //use that query thing from yesterday discussion question in fetch request
    }
