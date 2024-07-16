const result = document.getElementById('result')
const submit = document.querySelector('.submit')
const wraper = document.querySelector('.sora-wraper')
const soraBtn = wraper.querySelector('.select-sora')
const soraSpan = soraBtn.querySelector('span')
const soraContent = wraper.querySelector('.content')
const soraUl = soraContent.querySelector('.options')
const soraInput = document.getElementById("sorah-input")
const wraperReciter = document.querySelector('.reciter-wraper')
const reciterBtn = wraperReciter.querySelector('.select-reciter')
const reciterSpan = reciterBtn.querySelector('span')
const reciterContent = wraperReciter.querySelector('.content')
const reciterUl = document.getElementById('reciter-options')
const reciterInput = document.getElementById("reciter-input")
let reciterLis = document.getElementsByClassName('reciter-li')
let soraLis = document.getElementsByClassName('sora-li')
let array = []
let noReciter = ''
const pReciter = document.createElement('p')
const pSora = document.createElement('p')
const adkarSabah = document.querySelector('.adkar-sabah')
const adkarSabahContent = document.querySelector('.adkar-sabah-content')
const adkarSabahUl = adkarSabahContent.querySelector('ul')
let adkarSabahLis = adkarSabahUl.querySelectorAll('li')
let adkarSabahActive = document.querySelector(".adkar-sabah-active")
let adkarSabahCounter = adkarSabahActive.querySelectorAll('.counter')
const adkarMassa = document.querySelector('.adkar-massa')
const adkarMassaContent = document.querySelector('.adkar-massa-content')
const quranContainer = document.querySelector('.quran-container')
const quranButton =  document.querySelector('.quran')
adhanContainer = document.querySelector('.adhan-time')
adhanButton = document.querySelector('.adhan-button')
const arrowsLeft = document.querySelectorAll('.uil-arrow-circle-left')
const arrowsRight = document.querySelectorAll('.uil-arrow-circle-right')
const resetAdkar = document.querySelectorAll('.reset-adkar')
const container = document.querySelector('.container')

const counterList = document.querySelectorAll('.counter') 
const resetCounterList = document.querySelectorAll('.reset-counter')

// To respect chrome CSP i added onclick(showNext(this)) with javascript instead of html

counterList.forEach(counter => {
    counter.addEventListener('click', function() {
        showNext(this)
    })
})

// To respect chrome CSP i added onclick(resetCounter(event)) with javascript instead of html

resetCounterList.forEach(counter => {
    counter.addEventListener('click', function() {
        resetCounter(event)
    })
})

// A disclaimer button to let users know that using vpn will affect the accuracy of adhan time

const disclaimerBtn = adhanButton.querySelector('p')
disclaimerBtn.addEventListener('click', function() {
    event.stopPropagation()
    disclaimerBtn.classList.toggle('disclaimer-active')
    disclaimerBtn.nextElementSibling.classList.toggle('information-active')
    document.querySelector('.box').classList.toggle('box-active')
})
disclaimerBtn.nextElementSibling.addEventListener('click', function() {
    event.stopPropagation()
    disclaimerBtn.classList.toggle('disclaimer-active')
    disclaimerBtn.nextElementSibling.classList.toggle('information-active')
    document.querySelector('.box').classList.toggle('box-active')
}) 
    

// A button at the end of the adkar journey to reset the adkar content  

resetAdkar.forEach(element => {
    element.addEventListener('click', function() {
        const currentLi = element.closest('li')
        const currentUl = element.closest('ul')
        const nextLi = currentUl.firstElementChild
        currentLi.classList.toggle('adkar-sabah-active')
        nextLi.classList.toggle('adkar-sabah-active')
    } )
})

// for a better UX i added left and right arrows to move faster between the adkar

arrowsLeft.forEach(element => {
    element.addEventListener('click', function(button) {
        const currentLi = element.closest('li')
        const nextLi = currentLi.nextElementSibling
        if (nextLi !== null) {
        currentLi.classList.toggle('adkar-sabah-active')
        currentLi.querySelector('p').textContent =  currentLi.querySelector('p').getAttribute('data-default')
        nextLi.classList.toggle('adkar-sabah-active')
        } else {
            element.style.color = 'red'
        }
    })
});

// for a better UX i added left and right arrows to move faster between the adkar

arrowsRight.forEach(element => {
    element.addEventListener('click', function() {
       const currentLi = element.closest('li')
       const previosLi = currentLi.previousElementSibling
       if (previosLi !== null) {
       currentLi.classList.toggle('adkar-sabah-active')
       currentLi.querySelector('p').textContent =  currentLi.querySelector('p').getAttribute('data-default')
       previosLi.classList.toggle('adkar-sabah-active')
       } else {
        element.style.color = 'red'
       }
    })
})

// a function used every time the user click on a counter, when you reach the value 0 the next click
// will take you to the next element sibling 

function showNext(button) {
  // Get the current li element
    let formatter = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
  const currentP = button.querySelector('p')
  currentValue = currentP.textContent
  currentValue -= 1
  currentP.textContent = formatter.format(currentValue)
  const currentLi = button.closest('li');
  // Find the next li element
  const nextLi = currentLi.nextElementSibling;
  

  if (currentValue < 0 && nextLi !== null ) {
    currentP.textContent = currentP.dataset.default
    // Hide the current li element
    currentLi.classList.toggle('adkar-sabah-active')
    // Show the next li element
    nextLi.classList.toggle('adkar-sabah-active')
  } 
}

// a function used every time we click on the reset counter btn, ruturn the original value of
// the paragraph using the value stored on the data-default

function resetCounter(event) {
    event.stopPropagation(); // Prevent triggering the parent click event
    const counterElement = event.target.previousElementSibling; // Get the <p> element
    const defaultValue = counterElement.getAttribute('data-default'); // Get the default value
    counterElement.textContent = defaultValue; // Reset the counter value
}



let lien = ''
let soraLien = ''


// fetch suwar data from an api 

async function suwarFetch() {
    try {
    const res = await fetch('https://mp3quran.net/api/v3/suwar')
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    console.log(data)
    for (item of data.suwar) {
        soraUl.innerHTML += `<li class='sora-li' value="${item.id}">${item.name}</li>`
    }
    soraInput.addEventListener('keyup', function() {
    let searchValue = event.target.value.toLowerCase()
    for (i = 0; i < soraLis.length; i++) {
        let currentValue = soraLis[i].textContent.toLowerCase()
        if(currentValue.includes(searchValue)) {
            soraLis[i].style = `display: list-item;`
            soraLis[i].classList.add('sora-on')
        } else {
            soraLis[i].style = `display: none;`
            soraLis[i].classList.remove('sora-on')
        }
    }
    if (document.querySelectorAll('.sora-on').length === 0) {
        pSora.value = 'no-click'
        pSora.textContent = 'لا توجد سورة بهذا الاسم'
        soraUl.appendChild(pSora)
        pSora.style.display = 'list-item'
    } else {
        pSora.style.display = 'none'
    }
} )

// a function it's main job is to select a sora and establish the sora part of the link and store it 

soraUl.addEventListener('click', function(e) {
    soraLien = e.target.value
    for (item of data.suwar) {
            if (+soraLien === item.id) {
                if (+ soraLien < 10) {
                    soraLien = `00${soraLien}`
                } else if (+ soraLien < 100) {
                    soraLien = `0${soraLien}`
                } else {
                    soraLien = soraLien
                }
            }
}  if (soraLien !== soraUl.value && soraLien !== 'no-click') {
    soraSpan.textContent = e.target.textContent
    soraBtn.classList.add('selected-sora')
}   
})

    } catch(error) {
       soraUl.innerHTML = '<p>تحقق من اتصالك بالأنترنت</p>'
    }
}
 
suwarFetch()

// fetch reciters from an api

async function recitersFetch() {

    try {
          const res = await fetch('https://mp3quran.net/api/v3/reciters')
         if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
         }
    const data = await res.json()
    for (item of data.reciters) {
        reciterUl.innerHTML += `<li class='reciter-li' value='${item.id}'>${item.name}</li>`
    }
        reciterInput.addEventListener('keyup', function() {
    let searchValue = event.target.value.toLowerCase()
    for (i = 0; i < reciterLis.length; i++) {
        let currentValue = reciterLis[i].textContent.toLowerCase()
        if(currentValue.includes(searchValue)) {
            reciterLis[i].style = `display: list-item;`
            reciterLis[i].classList.add('reciter-on')
        } else  {
            reciterLis[i].style = `display: none;`
            reciterLis[i].classList.remove('reciter-on')
        } 
    }
       if (document.querySelectorAll('.reciter-on').length === 0) {
        pReciter.textContent = 'لا يوجد قارئ بهذا الاسم'
        pReciter.value = 'no-click'
        reciterUl.appendChild(pReciter)
        pReciter.style.display = 'list-item'
    } else {
       pReciter.style.display = 'none'
    }
    
})
 
// a function it's main job is to select a reciter and establish the reciter part of the link and store it 

    reciterUl.addEventListener('click', function(e) {
    let optionValue = e.target.value
    for(item of data.reciters) {
            if (+ optionValue === item.id) {
               lien = item.moshaf[0].server
            }
            
}   if (optionValue !== 'no-click' && optionValue !== reciterUl.value ) {
     reciterSpan.textContent = e.target.textContent
     reciterBtn.classList.add('selected-reciter')
}
})
    } catch(error) {
        reciterUl.innerHTML = '<p>تحقق من اتصالك بالأنترنت</p>'
    }
}      
recitersFetch()

soraBtn.addEventListener('click', function() {
     wraper.classList.toggle('active')
})
reciterBtn.addEventListener('click', function() {
     wraperReciter.classList.toggle('active')
})

// a click on the submit button by the user will triger a function, the main job of it 
// is combining the sora link part and the reciter link part to obtain the audio src

submit.addEventListener('click', function(e) {
   e.preventDefault()
   if (lien !== '' && soraLien !== '' ) {
    result.innerHTML = `<audio controls src="${lien + soraLien}.mp3"></audio>`
    submit.classList.add('submit-active')
   }
})

// a big function that may look difficult to understand, the function two main jobs are:
// one : get the user location using geolocation
// two : fetch adhan times from an api

function getLocationAndFetchData(url) {
     // get the user location using geolocation
     navigator.geolocation.getCurrentPosition(async (position) => {
    try {
  const lat = position.coords.latitude;
  const  long = position.coords.longitude;
    const location = `latitude=${lat}&longitude=${long}&method=21"` 
    console.log(location)
      let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let h = String(today.getHours()).padStart(2, '0');
let minutes = String(today.getMinutes()).padStart(2, '0');
let hDate = `${h}:${minutes}`


today = dd + '-' + mm + '-' + yyyy;

    // fetch adhan times from an api 

    const response = await fetch(`${url}${today}?${location}`)
      if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    const data = await response.json()

    const timings = data.data.timings
    let array = []
    array.push(timings.Fajr, timings.Dhuhr, timings.Asr, timings.Maghrib, timings.Isha)
  
        // a function that convert 'hour:minutes' format to number of minutes 

          function getMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number)
        return hours * 60 + minutes
    }

        // a function that ruturn back the closest adhan to your own time 

    function findTheClosest(currentTime, timeArray) {
     const   currentTimeMinutes = getMinutes(currentTime)
     const filtterArray = timeArray.filter(value => value > currentTime)
       if (filtterArray.length !== 0 ){
       return  filtterArray. reduce((closestDate, currentDate) => {
      const currentDateInMinutes = getMinutes(currentDate)
      const closestDateInMinutes = getMinutes(closestDate)
      return Math.abs(currentDateInMinutes - currentTimeMinutes ) < Math.abs(closestDateInMinutes - currentTimeMinutes ) ? currentDate : closestDate
      })  } else if (filtterArray.length === 0) {
        return timeArray[0]
      }
        
     }
            const closestTime = findTheClosest(hDate, array) 
        
        // a function that calculate the remaining time to the adhan 

            function calcRemainingTime (closestTime, hDate) {
                if (closestTime !== timings.Fajr) {
                    return  Math.abs(getMinutes(closestTime) - getMinutes(hDate)) 
                } else {
                    if (getMinutes(timings.Isha) > getMinutes(hDate)) {
                        return  Math.abs(getMinutes(timings.Fajr) - getMinutes(hDate)) 
                    } else {
                        return  Math.abs(1440 - getMinutes(hDate)) + getMinutes(closestTime)
                    }
                }
            }
            const remainingTime = calcRemainingTime(closestTime, hDate)

            // a function that convert minutes to 'hour:minutes' format

   function converter(value) {
  const hours = String(Math.floor(value / 60)).padStart(2, '0') 
  const rMinutes = Math.abs(hours - (value / 60)) 
  const minutes =  String((rMinutes * 60).toFixed(0)).padStart(2, '0')
  return `${hours}h ${minutes}min`
  } 
 const finalReaminingTime = converter(remainingTime)
 const pTime = document.createElement('p')
 pTime.classList.add('p-time')


    // if else statement to print the next adhan and the time remaining to it on the user page

 if (closestTime === timings.Fajr) {
    pTime.innerHTML = `: الوقت المتبقي للفجر  <span>${finalReaminingTime}</span>`
 } else if (closestTime === timings.Dhuhr) {
    pTime.innerHTML = `الوقت المتبقي للظهر <span>${finalReaminingTime}</span>`
 } else if (closestTime === timings.Asr) {
    pTime.innerHTML = `  الوقت المتبقي للعصر <span>${finalReaminingTime}</span>`
 } else if (closestTime === timings.Maghrib) {
    pTime.innerHTML = `الوقت المتبقي للمغرب  <span>${finalReaminingTime}</span>`
 } else if (closestTime === timings.Isha) {
    pTime.innerHTML = `الوقت متبقي للعشاء <span>${finalReaminingTime}</span>`
 }

    // the times of all adhans

    adhanContainer.innerHTML = 
    `
     <p><span>${timings.Fajr}</span> <span>الفجر</span></p>
     <p><span>${timings.Dhuhr}</span> <span>الظهر</span></p>
     <p><span>${timings.Asr}</span> <span>العصر</span></p>
     <p><span>${timings.Maghrib}</span> <span>المغرب</span></p>
     <p><span>${timings.Isha}</span> <span>العشاء</span></p>
    `
    adhanContainer.prepend(pTime) 

    // catch error if the api somehow didnt work

    } catch(error) {
      console.error('an error occured while fetching data in adhanTime', error)
      document.querySelector('.error-p').style.display = 'block'
         }
     },
       
       // catch error if the geolocation somehow didnt work

       (error) => {
         console.error('Geolocation error:', error.message);
         document.querySelector('.error-p').style.display = 'block'
     } ) } 


 // calling our get location and adhan function 

getLocationAndFetchData(`https://api.aladhan.com/v1/timings/`)

// using interval so the function get called every 60 seconds to keep the remaining time
// changing as the user time change

setInterval(() => getLocationAndFetchData(`https://api.aladhan.com/v1/timings/`), 60000)


quranContainer.addEventListener('click', function() {
  
    quranButton.classList.toggle('quran-active')
    quranContainer.classList.toggle('quran-container-active')
    adkarSabahContent.classList.remove('adkar-content-active')
    adkarSabah.classList.remove('adkar-sabah-active')
    adhanContainer.classList.remove('adhan-time-active')
    adhanButton.classList.remove('adhan-button-active')
    adkarMassaContent.classList.remove('adkar-content-active')
    adkarMassa.classList.remove('adkar-massa-active')
    
})

adkarSabah.addEventListener('click', function() {
    
    adkarSabahContent.classList.toggle('adkar-content-active')
    adkarSabah.classList.toggle('adkar-sabah-active')
    adhanContainer.classList.remove('adhan-time-active')
    adhanButton.classList.remove('adhan-button-active')
    adkarMassaContent.classList.remove('adkar-content-active')
    adkarMassa.classList.remove('adkar-massa-active')
    quranButton.classList.remove('quran-active')
    quranContainer.classList.remove('quran-container-active')
    
})
adkarMassa.addEventListener('click', function() {

    adkarMassaContent.classList.toggle('adkar-content-active')
    adkarMassa.classList.toggle('adkar-massa-active')
    adkarSabahContent.classList.remove('adkar-content-active')
    adkarSabah.classList.remove('adkar-sabah-active')
    adhanContainer.classList.remove('adhan-time-active')
    adhanButton.classList.remove('adhan-button-active')
    quranButton.classList.remove('quran-active')
    quranContainer.classList.remove('quran-container-active')
    
})
adhanButton.addEventListener('click', function() {
    adhanContainer.classList.toggle('adhan-time-active')
    adhanButton.classList.toggle('adhan-button-active')
    adkarMassaContent.classList.remove('adkar-content-active')
    adkarMassa.classList.remove('adkar-massa-active')
    adkarSabahContent.classList.remove('adkar-content-active')
    adkarSabah.classList.remove('adkar-sabah-active')
    quranButton.classList.remove('quran-active')
    quranContainer.classList.remove('quran-container-active')
})