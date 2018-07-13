const submitButton = document.querySelector('.form-submit')
const tokenContainer = document.querySelector('.token-container');

document.getElementById("formSubmit").onsubmit = function onSubmit(event) {
  event.preventDefault()
  const email = event.target[0].value
  const appName = event.target[1].value
  postUserInfo(email, appName)

}

const postUserInfo = (email, appName) => {
  const url = '/';
  const data = {email, appName};

  fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      tokenContainer.innerText = 'Token: ' + data.token;
    })
    .catch(error => {
      tokenContainer.innerText = json.stringify(error)
    })
};

