const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { //var e is just short for event
    e.preventDefault() // stop browser from auto-reloading
    const location = search.value; //get the value of search variable

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {    
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            console.log(data.location)
            console.log(data.forecast)
        }        
    })
})
    
})