// Variables
const button = document.getElementById('button')
const output = document.getElementById('output')

// Function Title Case

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }

// Event Listener
button.addEventListener('click', ajaxCall)

// AJAX
function ajaxCall () {
    const xhr = new XMLHttpRequest()
    console.log(xhr)

    xhr.onprogress = function () {
        output.innerHTML = 'LOADING . . .'
    }

    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(xhr.responseText)
            console.log(json.results[0].gender)
            
            // Grab Profile Picture
            var picture = '<div><img src="' +json.results[0].picture.large+ '"></div>'

            // Grab Full Name
            var name = json.results[0].name
            var fullName = '<div><strong>' +`${titleCase(name.title)} ${titleCase(name.first)} ${titleCase(name.last)}`+ '</strong></div>'
            var email = '<div> Email :' +json.results[0].email+ '</div>'
            var html = JSON.stringify(json.results)
            output.innerHTML = picture+fullName+email
        }
    }
    xhr.open('GET', 'https://randomuser.me/api', true)
    xhr.send ()

}
