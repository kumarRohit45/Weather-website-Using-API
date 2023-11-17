const userTab = document.querySelector('.your-weather-tab');
const searchTab = document.querySelector('.search-weather-tab');
const grantAccess = document.querySelector('.grant-access-container');
const searchForm = document.querySelector('.form-container');
const loadingScreen = document.querySelector('.loader-container');
const userInfoContainer = document.querySelector('.user-information-container');

let currentTab = userTab;
const API_KEY = "171e88611daab70d2923a61e2bae6e05";
currentTab.classList.add("now");
getFromSessionStorage();

userTab.addEventListener('click',()=>{
  getFromSessionStorage();
  searchForm.classList.remove("active");
})

function switchTab(clickedTab){
  if(clickedTab != currentTab){
    currentTab.classList.remove("now");
    currentTab = clickedTab;
    currentTab.classList.add("now");

    if(!searchTab.classList.contains("active")){
      userInfoContainer.classList.remove("active");
      grantAccess.classList.remove("active");
      searchForm.classList.add("active");
    }
    else{
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      //now i am in your weather tab so i have to display weather too , so let's check local storage first for coordinate , if we have saved them there. 
      getFromSessionStorage();
    }
  }
}

userTab.addEventListener("click",()=>{
  switchTab(userTab);
})
searchTab.addEventListener("click",()=>{
  switchTab(searchTab);
})


//check if coordinates are already present in session storage
function getFromSessionStorage(){
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if(!localCoordinates){
    grantAccess.classList.add("active");
  }

  else{
    const coordinates = JSON.parse(localCoordinates);
    
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates){
  const{lat,lon} = coordinates;
  //make grantContainer invisible
  grantAccess.classList.remove("active");
  //make loader visible
  loadingScreen.classList.add("active");


  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    // console.log(data);
   
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  }

  catch(err){
    loadingScreen.classList.remove("active");
  }
}


function renderWeatherInfo(weatherInfo){
  //fetch elements
  const cityName = document.querySelector(".cityName");
  const countryIcon = document.querySelector(".country-icon")
  const desc = document.querySelector(".weather-description");
  const weatherIcon = document.querySelector(".weather-icon");
  const temp = document.querySelector(".temp");
  const windSpeed = document.querySelector(".wind-speed");
  const humididty = document.querySelector(".humidity-per");
  const cloudiness = document.querySelector(".rain-per");


  //fetch vlaues from the weatherInfo
  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = `${weatherInfo?.main?.temp} °C`;

  windSpeed.innerText = weatherInfo?.wind?.speed;
  humididty.innerText = weatherInfo?.main?.humidity;
  cloudiness.innerText = weatherInfo?.clouds?.all;

}
// console.log(weatherInfo?.wind?.speed);

function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  else{
    // show an alert for geolocation
  }
}

function showPosition(position){
  const userCoordinates = {
    lat:position.coords.latitude,
    lon:position.coords.longitude,
  }

  sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}


const grantAccessBtn = document.querySelector(".grant-access-button");
grantAccessBtn.addEventListener("click",getLocation);


const searchInput = document.querySelector(".search-input");
searchForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  // console.log("search Form ");
  let cityName = searchInput.value;
  // console.log(cityName);

  if(cityName === ""){
    return ;
  }
  else{
    fetchSearchWeatherInfo(cityName);
  }
})

async function fetchSearchWeatherInfo(city){
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccess.classList.remove("active");

  try{
    const response  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  }
  catch (err){
        
          console.error(err);
  }
}

















































// let currentTab  = userTab;
// let API_KEY = "171e88611daab70d2923a61e2bae6e05";
// currentTab.classList.add('now');
// // getSessionStorage();

// // userTab.addEventListener('click',()=>{
// //   switchTab(userTab);
// // })

// // searchTab.addEventListener('click',()=>{
// //   switchTab(searchTab);
// // })

// //  function switchTab(clickTab){
// //       if(currentTab !=clickTab){

// //         currentTab.classList.remove('now');
// //         currentTab =  clickTab;
// //         currentTab.classList.add('now');

// //         if(!searchTab.classList.contains('active')){
// //             searchTab.classList.add('active');
// //             grantAccess.classList.remove('active');
// //             userInfoContainer.classList.remove('active');
// //         }
// //         else{
// //             searchTab.classList.remove('active');
// //             grantAccess.classList.remove('active');
// //             getSessionStorage();
// //         }
// //       } 
// //    }
  
  

//       // function getSessionStorage()
//       // {
//       //   const localCoordinates  = sessionStorage.getItem("user-coordinate");
//       //   if(!localCoordinates){

//       //       grantAccess.classList.add('active');

//       //   }

//       //   else{
//       //       const coordinate = JSON.parse(localCoordinates);
//       //       fetchUserWeatherInfo(coordinate);
//       //   }
//       // }

//     async  function fetchUserWeatherInfo(coordinate){
//         // const {lat,lon}=coordinate;
//         // grantAccess.classList.remove('active');
//         loadingScreen.classList.add('active');

        
//          try{
//         //  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`);
//          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=17.33&lon=18.33&appid=${API_KEY}`);

//          const data = await response.json();
//          console.log(data);
//          loadingScreen.classList.remove('active');
//         //  userInfoContainer.classList.add('active');
//         //  renderWeather(data);
//         }
//           catch(e){
//            loadingScreen.classList.remove('active');    
//              } 
//     }

     
//       //  function renderWeather(weatherInfo){
//       //   const cityName = document.querySelector(".cityName");
//       //   const countryIcon = document.querySelector(".countryicon");

//       //   const weatherDesc = document.querySelector(".typeofweather");
//       //   const weatherIcon = document.querySelector(".weather-icon");

//       //   const temp = document.querySelector(".temp");

//       //   const windSpeed = document.querySelector(".wind-speed");

//       //   const humididty = document.querySelector(".humidity-per");
//       //   const cloudiness = document.querySelector(".rain-per");

//       //   //fetch values from weatherInfo object and put it UI elements

//       //   cityName.innerText = weatherInfo?.name;
//       //   countryIcon.src = `https://flagcdn.com/144x188/${weatherInfo?.sys.country.toLowerCase()}.png`;

//       //   weatherDesc.innerText = weatherInfo?.name;
//       //   weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//       //   temp.innerText = weatherInfo?.main?.temp;
//       //   windSpeed.innerText = weatherInfo?.wind?.speed;
//       //   humididty.innerText = weatherInfo?.main?.humidity;
//       //   cloudiness.innerText = weatherInfo?.clouds?.all;


//       //   }



//         //GEt Location

// //         function getLocation(){
// //           if(navigator.geolocation){
// //             navigator.geolocation.getCurrentPosition(showPosition);
// //           }

// //           else{
// //             // hw - show an alert for no getLocation support available
// //           }
// //         }

// //         function showPosition(position){
// //           const userCoordinates = {
// //             lat: position.coords.latitude,
// //             lon:position.coords.lonitude,
// //           }
// // sessionStorage.setItem("user-coordinate",JSON.stringify(userCoordinates));

// // fetchUserWeatherInfo(userCoordinates);
// //         }


//         //Grant Access

// // const grantAccessBtn = document.querySelector(".grant-access-button");
// // grantAccessBtn.addEventListener('click',getLocation);


// // const searchInput = document.querySelector(".search-input");
// // formSearchTab.addEventListener("submit",(e)=>{
// //   e.preventDefault();
// //   let cityName = searchInput.value;

// //   if(cityName === ""){
// //     return;
// //   }

// //   else{
// //     fetchSearchWeatherInfo(cityName);
// //   }
// // })

// // async function fetchSearchWeatherInfo(city){
// //   loadingScreen.classList.add('active');
// //   userInfoContainer.classList.remove('active');
// //   grantAccess.classList.remove('active');

// //   try{
// //      const response = await fetch(``)

// //      const data = response.json();
// //      loadingScreen.classList.remove('active');
// //      userInfoContainer.classList.add('active');
// //      renderWeather(data);
// //   }
// //   catch(e){
// //     //hw
// //   }
// // }



