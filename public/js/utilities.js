export function getFA() {
  let fontAwesome = document.createElement('script');
  fontAwesome.src = 'https://kit.fontawesome.com/ac20bc98b6.js';
  fontAwesome.crossorigin = 'anonymous';
  document.head.append(fontAwesome);
}
export function makeTitle() {
  let title = document.createElement('h1');
  title.innerText = 'Kitten Pic';
  document.body.append(title);
}

export function makeControls() {
  let controls = document.createElement('div');
  controls.classList.add('controls');
  let requestImg = document.createElement('button');
  requestImg.innerText = 'Get Pic'
  requestImg.classList.add('request');
  let url;
  requestImg.addEventListener('click', async e => {
    let res = await fetch('https://api.thecatapi.com/v1/images/search')
      .then(res => res.json());
    let exists = document.querySelector('.catCard');

    if (exists) {
      let catCard = document.querySelector('.catCard');
      let img = exists.querySelector('img');
      img.src = res[0].url;
      let votes = document.querySelector('.left');
      votes.remove();
      let form = document.querySelector('form');
      form.remove();
      let comments = document.querySelectorAll('.comment');
      comments.forEach((comment, i) => comments[i].remove());
      
      catCard.append( makeVotes() );
      catCard.append( makeForm() );
    } else {
      let catCard = document.createElement('div');
      catCard.classList.add('catCard');
      let image = document.createElement('img');
      image.src = res[0].url;
      image.alt = 'A cute cat picture';

      catCard.append(image);
      catCard.append( makeVotes() );
      catCard.append( makeForm() );
      document.body.append(catCard);
    }
  });
  controls.append(requestImg);
  document.body.append(controls);
};

function makeVotes() {
  let voting = document.createElement('div');
  voting.classList.add('controls', 'left');
  voting = makeUV(voting);
  voting = makeDV(voting);
  
  return voting;
}
function makeUV(parent) {
  let uvote = document.createElement('i');
  uvote.classList.add("fa-regular", "fa-thumbs-up", "fa-2x");
  uvote.setAttribute('data-count', 0);
  uvote.addEventListener('click', upVote);
  let uvoteNum = document.createElement('p');
  uvoteNum.innerText = 0;
  parent.append(uvote);
  parent.append(uvoteNum);

  return parent;
}
function upVote() {
  let uvote = document.querySelector('.fa-thumbs-up');
  let uvoteNum = document.querySelectorAll('.left p')[0]
  uvote.dataset.count++;
  uvoteNum.innerText = uvote.dataset.count;
}
function makeDV(parent) {
  let dvote = document.createElement('i');
  dvote.classList.add("fa-regular", "fa-thumbs-down", "fa-2x")
  dvote.setAttribute('data-count', 0);
  dvote.addEventListener('click', downVote)
  let dvoteNum = document.createElement('p');
  dvoteNum.innerText = 0;
  parent.append(dvote);
  parent.append(dvoteNum);

  return parent;
}
function downVote() {
  let dvote = document.querySelector('.fa-thumbs-down');
  let dvoteNum = document.querySelectorAll('.left p')[1]
  dvote.dataset.count++;
  dvoteNum.innerText = dvote.dataset.count;
}
export function makeForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  input.type = 'text';
  let button = document.createElement('button');
  button.innerText = "COMMENT";
  button.addEventListener('click', addComment);
  
  form.append(input);
  form.append(button);
  
  return form;
}
function addComment(e) {
  e.preventDefault();
  let catCard = document.querySelector('.catCard');
  let input = document.querySelector('form input');
  let content = input.value;
  if (content !== "") {
    let now = new Date();
    let time = now.getMinutes()<10?`${now.getHours()}:0${now.getMinutes()}`:`${now.getHours()}:${now.getMinutes()}`;
  
    input.value = '';
    let newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `<span>${time}</span> || ${content}`;
    
    catCard.append(newComment);
  } else {
    alert('You should write something first...')
  }
}