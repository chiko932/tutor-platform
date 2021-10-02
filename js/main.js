(function() {
  "use strict";
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }
})()

var random=Math.floor(Math.random()*7);

var myMusic;

function makeSound(key){
  switch(key){
    case 0:
       myMusic=new Audio('assets/Music/Best-of-me.mp3');
      break;
    case 1:
      myMusic=new Audio('assets/Music/Aurora.mp3');
      break;
    case 2:
      myMusic=new Audio('assets/Music/Grateful.mp3');
      break;
    case 3:
      myMusic=new Audio('assets/Music/Rambo.mp3');
      break;
    case 4:
      myMusic=new Audio('assets/Music/First-time.mp3');
      break;
    case 5:
       myMusic=new Audio('assets/Music/Monster.mp3');
       break;
    case 6:
        myMusic=new Audio('assets/Music/Arcade.mp3');
        break;
  }
}

function Show(){
  var pics=document.getElementById("my-pics");
  if(pics.style.display ==="none"){
    pics.style.display = "block";
  }
  else{
    pics.style.display = "none";
  }
}

function playing(){
  if(myMusic==null){
    makeSound(random);
    myMusic.play();
  }
  else{
    myMusic.play();
  }
}
function paused(){
  myMusic.pause();
}

function skipped(){
  myMusic.pause();
  myMusic=null;
  random=Math.floor(Math.random()*7);;
  playing();
}