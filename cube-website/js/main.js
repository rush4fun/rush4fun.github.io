var close = document.querySelector('.close');
var menuCheckbox = document.querySelector('#menu-checkbox');
close.addEventListener('click', function () {
  menuCheckbox.checked = false;
});
var cube = {
  portfolio: [{
    id: 0,
    type: 'app',
    client: 'David lee1 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '1davidlee.arch',
    img: ['img/emma_back.jpg', 'img/emma_front.jpg'],
    like: true
  }, {
    id: 1,
    type: 'web-design',
    client: 'David lee2 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '2davidlee.arch',
    img: ['img/john_back.jpg', 'img/john_front.jpg'],
    like: false
  }, {
    id: 2,
    type: 'branding',
    client: 'David lee3 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '3davidlee.arch',
    img: [],
    like: false
  }, {
    id: 3,
    type: 'branding',
    client: 'David lee4 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '4davidlee.arch',
    img: [],
    like: false
  }, {
    id: 4,
    type: 'web-design',
    client: 'David lee5 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '5Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '5davidlee.arch',
    img: [],
    like: false
  }, {
    id: 5,
    type: 'app',
    client: 'David lee6 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '6Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '6davidlee.arch',
    img: [],
    like: false
  }, {
    id: 6,
    type: 'branding',
    client: 'David lee7 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '7Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '7davidlee.arch',
    img: [],
    like: false
  }, {
    id: 7,
    type: 'app',
    client: 'David lee8 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '8Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '8davidlee.arch',
    img: [],
    like: false
  }, {
    id: 8,
    type: 'app',
    client: 'David lee9 - Architect',
    date: '2014',
    skills: 'web design - identity',
    text: '9Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '9davidlee.arch',
    img: [],
    like: false
  }, {
    id: 9,
    type: 'app',
    client: 'David lee10 - Architect',
    date: '2010',
    skills: 'web design - identity',
    text: '10Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fringilla mi orci, ac venenatis ante venenatis eget.',
    site: '10davidlee.arch',
    img: [],
    like: false
  }],
  setting: function setting() {
    var portfolioItem = document.querySelectorAll('.portfolio__item');
    portfolioItem.forEach(function (item) {
      for (var i = 0; i < cube.portfolio.length; i++) {
        if (item.dataset.id == cube.portfolio[i].id) {
          item.dataset.type = cube.portfolio[i].type;
        }
      }
    });
  },
  navigation: function navigation() {
    var portfolioNavigation = function portfolioNavigation() {
      var portfolioLink = document.querySelectorAll('.nav-portfolio__link');
      var portfolioItem = document.querySelectorAll('.portfolio__item');
      portfolioLink.forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          for (var i = 0; i < portfolioItem.length; i++) {
            portfolioItem[i].style.display = 'none';
            if (this.dataset.type == 'all') {
              portfolioItem[i].style.display = 'flex';
              var loadMoreBtn = document.querySelector('.js-loadMore');
              loadMoreBtn.style.display = 'none';
            }
            if (this.dataset.type == portfolioItem[i].dataset.type) {
              portfolioItem[i].style.display = 'flex';
              var _loadMoreBtn = document.querySelector('.js-loadMore');
              _loadMoreBtn.style.display = 'none';
            }
          }
        });
      });
    };
    portfolioNavigation();
  },
  loadMore: function loadMore() {
    var loadMoreBtn = document.querySelector('.js-loadMore');
    loadMoreBtn.addEventListener('click', function (event) {
      event.preventDefault();
      var portfolioItem = document.querySelectorAll('.portfolio__item');
      portfolioItem.forEach(function (item) {
        item.style.display = 'flex';
        loadMoreBtn.style.display = 'none';
      });
    });
  },
  openPortfolioCase: {
    popUp: document.querySelector('#popup'),
    loadPopUpContent: function (curId) {
      for (var i = 0; i < cube.portfolio.length; i++) {
        if (cube.portfolio[i].id == curId) {
          var loadPicturePopUp = function loadPicturePopUp(index) {
            var loadPicture = function loadPicture(currStep) {
              var picturePopUp = document.querySelector('.js-picture');
              picturePopUp.src = cube.portfolio[index].img[currStep];
            };
            var step = 0;
            loadPicture(step);
            var countPictures = function countPictures() {
              var currentPicIndex = document.querySelector('.js-popUpCurrentPicIndex');
              var picLenght = document.querySelector('.js-popUpPicLenght');
              if (cube.portfolio[index].img.length != 0) {
                currentPicIndex.innerHTML = step + 1;
              } else {
                currentPicIndex.innerHTML = step;
              }
              picLenght.innerHTML = cube.portfolio[index].img.length;
            };
            countPictures();
            var prevPic = document.querySelector('.js-popUpPrevPic');
            var nextPic = document.querySelector('.js-popUpNextPic');
            nextPic.addEventListener('click', function () {
              if (step < cube.portfolio[index].img.length - 1) {
                step++;
                loadPicture(step);
                countPictures();
              };
            });
            prevPic.addEventListener('click', function () {
              if (step > 0) {
                step--;
                loadPicture(step);
                countPictures();
              }
            });
          };
          var loadClientPopUp = function loadClientPopUp(index) {
            var clientPopUp = document.querySelector('.js-popUpCleint');
            clientPopUp.lastChild.textContent = cube.portfolio[index].client;
          };
          var loadDatePopUp = function loadDatePopUp(index) {
            var datePopUp = document.querySelector('.js-popUpDate');
            datePopUp.lastChild.textContent = cube.portfolio[index].date;
          };
          var loadSkillsPopUp = function loadSkillsPopUp(index) {
            var skillsPopUp = document.querySelector('.js-popUpSkills');
            skillsPopUp.lastChild.textContent = cube.portfolio[index].skills;
          };
          var loadTextPopUp = function loadTextPopUp(index) {
            var textPopUp = document.querySelector('.js-popUpText');
            textPopUp.innerHTML = cube.portfolio[index].text;
          };
          var loadSitePopUp = function loadSitePopUp(index) {
            var sitePopUp = document.querySelector('.js-popUpSite');
            sitePopUp.lastChild.textContent = cube.portfolio[index].site;
          };
          var loadLikes = function (index) {
            var popUpLike = document.querySelector('.js-like');
            if (cube.portfolio[index].like == false) {
              popUpLike.classList.remove('like--red');
            } else if (cube.portfolio[index].like == true) {
              popUpLike.classList.add('like--red');
            }
            popUpLike.addEventListener('click', function (event) {
              event.preventDefault();
              var currId = cube.openPortfolioCase.popUp.dataset.id;
              if (cube.portfolio[currId].like == false) {
                popUpLike.classList.add('like--red');
                cube.portfolio[index].like = true;
              } else if (cube.portfolio[currId].like == true) {
                popUpLike.classList.remove('like--red');
                cube.portfolio[index].like = false;
              }
            });
          };
          loadSitePopUp(i);
          loadTextPopUp(i);
          loadSkillsPopUp(i);
          loadDatePopUp(i);
          loadClientPopUp(i);
          loadPicturePopUp(i);
          loadLikes(i);
        }
      }
    },
    openPopUp: function () {
      var portfolioItem = document.querySelectorAll('.js-openPopUp');
      portfolioItem.forEach(function (item) {
        item.addEventListener('click', function (event) {
          event.preventDefault();
          cube.openPortfolioCase.popUp.style.display = 'block';
          var currentId = this.closest('.portfolio__item').dataset.id;
          console.log(currentId);
          cube.openPortfolioCase.popUp.dataset.id = currentId;
          cube.openPortfolioCase.loadPopUpContent(currentId);
        });
      });
    },
    closePopUp: function closePopUp() {
      var close = document.querySelector('.js-closePopUp');
      close.addEventListener('click', function () {
        cube.openPortfolioCase.popUp.style.display = 'none';
      });
    },
    navigationProjects: function navigationProjects() {
      var nextProject = document.querySelector('.js-popUpNextProject');
      nextProject.addEventListener('click', function (event) {
        event.preventDefault();
        var popUpCurrentId = cube.openPortfolioCase.popUp.dataset.id;
        if (popUpCurrentId != cube.portfolio[cube.portfolio.length - 1].id) {
          var nextPopUpId = ++popUpCurrentId;
          cube.openPortfolioCase.popUp.dataset.id = nextPopUpId;
          cube.openPortfolioCase.loadPopUpContent(nextPopUpId);
        };
      });
      var prevProject = document.querySelector('.js-popUpPrevProject');
      prevProject.addEventListener('click', function (event) {
        event.preventDefault();
        var popUpCurrentId = cube.openPortfolioCase.popUp.dataset.id;
        if (popUpCurrentId > 0) {
          var prevPopUpId = --popUpCurrentId;
          cube.openPortfolioCase.popUp.dataset.id = prevPopUpId;
          cube.openPortfolioCase.loadPopUpContent(prevPopUpId);
        };
      });
    },
    init: function init() {
      this.openPopUp();
      this.closePopUp();
      this.navigationProjects();
    }
  },
  init: function init() {
    this.setting();
    this.loadMore();
    this.navigation();
    this.openPortfolioCase.init();
  }
};
document.addEventListener('DOMContentLoaded', function () {
  cube.init();
});