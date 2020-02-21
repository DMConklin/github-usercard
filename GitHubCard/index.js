/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/DMConklin/followers').
  then(response => {
    console.log(response);
  }).
  catch(err => {
    console.log(err);
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

let createCard = userData => {

  let card = document.createElement('div');
  card.setAttribute('class', 'card');

  let image = document.createElement('img');
  image.setAttribute('src', userData.avatar_url);
  card.appendChild(image);

  let cardInfo = document.createElement('div');
  cardInfo.setAttribute('class', 'card-info');
  card.appendChild(cardInfo);

  let name = document.createElement('h3');
  name.setAttribute('class', 'name');
  name.textContent = userData.name;
  cardInfo.appendChild(name);

  let username = document.createElement('p');
  username.setAttribute('class', 'username');
  username.textContent = userData.login;
  cardInfo.appendChild(username);

  let location = document.createElement('p');
  location.textContent = `Location: ${userData.location === null ? 'N/A' : userData.location}`;
  cardInfo.appendChild(location);

  let profile = document.createElement('p');
  cardInfo.appendChild(profile);

  let profileLink = document.createElement('a');
  profileLink.setAttribute('href', userData.html_url);
  profile.appendChild(profileLink);

  let followers = document.createElement('p');
  followers.textContent = `Followers: ${userData.followers}`;
  cardInfo.appendChild(followers);

  let following = document.createElement('p');
  following.textContent = `Following: ${userData.following}`;
  cardInfo.appendChild(following);

  let bio = document.createElement('p');
  bio.textContent = `Bio: ${userData.bio === null ? 'N/A' : userData.bio}`;
  cardInfo.appendChild(bio);

  return card;
}

let cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/DMConklin').
  then(response => {
    cards.appendChild(createCard(response.data));
  }).
  catch(err => {
    console.log(err);
  })

axios.get('https://api.github.com/users/DMConklin/followers').
then(myFollowers => {
  const followersArray = myFollowers.data;
  followersArray.forEach(myFollower => {
    axios.get(`https://api.github.com/users/${myFollower.login}`).
      then(user => {
        cards.appendChild(createCard(user.data));
      }).
      catch(err => {
        console.log(err);
      })
    })
  }).
catch(err => {
  console.log(err);
})