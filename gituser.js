axios.get('https://api.github.com/users/guilhermebalog')
    .then(function(response){
        var userInfo = response.data

        var h2Element = document.querySelector('#app p')
        h2Element.innerHTML = ''
        
        var authorLinkElement = document.createElement('a')
        authorLinkElement.setAttribute('href', userInfo.html_url)
        authorLinkElement.setAttribute('target', 'blank')

        var authorNameText = document.createTextNode(userInfo.name)

        authorLinkElement.appendChild(authorNameText)

        var h2Text = document.createTextNode("Created by ")
        h2Element.appendChild(h2Text)
        h2Element.appendChild(authorLinkElement)
    })
    .catch(function(error){
        console.warn(error)
    })