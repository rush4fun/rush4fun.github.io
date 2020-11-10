//
//  Create classes for making Images and Comments objects
//
class Image {
    constructor(src, width, height, id) {
        this.src = src;
        this.width = width;
        this.height = height;
        this.id = id;
        this.dislike = 0;
        this.like = 0;
        this.comments = [];
    }
    addBlock() {
        let mainInner = document.querySelector(".main__inner");
        let blockWrapper = document.createElement("div");
        blockWrapper.dataset.id = this.id;
        if (this.width > 480) {
            blockWrapper.classList.add("block", "js-Block", "block--wide");
        } if (this.height > 450) {
            blockWrapper.classList.add("block", "js-Block", "block--height");
        } else {
            blockWrapper.classList.add("block", "js-Block");
        }
        // mainInner.appendChild(blockWrapper);
        // BLOCKWRAPPER > FIGURE
        let figure = document.createElement("figure");
        figure.classList.add("image");
        blockWrapper.appendChild(figure);
        // BLOCKWRAPPER > FIGURE > FIGUREIMG,FIGCAPTION
        let figureImg = document.createElement("img");
        figureImg.setAttribute("src", this.src);
        figureImg.classList.add("js-blockImage");
        let figcaption = document.createElement("figcaption");
        figcaption.classList.add("caption");
        figure.appendChild(figureImg);
        figure.appendChild(figcaption);
        // BLOCKWRAPPER > FIGURE > FIGUREIMG,FIGCAPTION > COMMENT, DISLIKE, LIKE
        let comment = document.createElement("div");
        comment.classList.add("reaction", "comment");
        // BLOCKWRAPPER > FIGURE > FIGUREIMG,FIGCAPTION > COMMENT > COMMENTIMG, COMMENTCOUNT
        let commentImg = document.createElement("img");
        commentImg.setAttribute("src", "img/icon-comments.svg");
        comment.appendChild(commentImg);
        let commentCount = document.createElement("span");
        commentCount.classList.add("count");
        commentCount.innerHTML = this.comments.length;
        comment.appendChild(commentCount);
        figcaption.appendChild(comment);
        // BLOCKWRAPPER > FIGURE > FIGUREIMG,FIGCAPTION > DISLIKE
        let dislikes = document.createElement("div");
        dislikes.classList.add("reaction", "dislike");
        // BLOCKWRAPPER > FIGURE > FIGUREIMG,FIGCAPTION > DISLIKE > DISLIKEIMG,DISLIKECOUNT
        let dislikesImg = document.createElement("img");
        dislikesImg.setAttribute("src", "img/icon-dislike.svg");
        dislikes.appendChild(dislikesImg);
        let dislikesCount = document.createElement("span");
        dislikesCount.classList.add("count");
        dislikesCount.innerHTML = this.dislike;
        dislikes.appendChild(dislikesCount);
        figcaption.appendChild(dislikes);
        // BLOCKWRAPPER > FIGURE > FIGUREIMG,FIGCAPTION > LIKE
        let likes = document.createElement("div");
        likes.classList.add("reaction", "like");
        // BLOCKWRAPPER > FIGURE > FIGUREIMG,FIGCAPTION > LIKE > LIKEIMG,LIKECOUNT
        let likesImg = document.createElement("img");
        likesImg.setAttribute("src", "img/icon-like.svg");
        likes.appendChild(likesImg);
        let likesCount = document.createElement("span");
        likesCount.classList.add("count");
        likesCount.innerHTML = this.like;
        likes.appendChild(likesCount);
        figcaption.appendChild(likes);
        return mainInner.appendChild(blockWrapper);
    }
    addComments() {
        let commentsInner = document.querySelector('.comments__inner');
        commentsInner.innerHTML = "";
        this.comments.forEach(item => {
            let commentsItem = document.createElement('div');
            commentsItem.classList.add('comments__item');

            let commentsCaption = document.createElement('div');
            commentsCaption.classList.add('comments__caption');
            commentsItem.appendChild(commentsCaption);

            let commentsAuthor = document.createElement('p');
            commentsAuthor.classList.add('comments__author', 'text');
            commentsAuthor.innerHTML = `by ${item.author}`;
            commentsCaption.appendChild(commentsAuthor);

            let commentsDate = document.createElement('p');
            commentsDate.classList.add('comments__date', 'text');
            commentsDate.innerHTML = item.date;
            commentsCaption.appendChild(commentsDate);

            let commentsText = document.createElement('div');
            commentsText.classList.add('comments__text');
            commentsItem.appendChild(commentsText);

            let commentsReview = document.createElement('p');
            commentsReview.classList.add('text');
            commentsReview.innerHTML = item.text;
            commentsText.appendChild(commentsReview);

            return commentsInner.appendChild(commentsItem);;
        })
    }
}
// 
//  Arrays of objects
//  
let img1 = new Image("img/pic1.jpeg", 482, 322, 0);
img1.comments.push({
    author: "Anon93",
    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat.",
    date: "Today 10:21 PM",
});
let img2 = new Image("img/pic2.jpeg", 684, 456, 1);
img2.comments.push({
    author: "Anon93",
    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat.",
    date: "Today 10:21 PM",
}, {
    author: "Anon93",
    text: "Nullam viverra leo eget urna maximus, et pellentesque enim volutpat.",
    date: "Today 10:21 PM",
});
let img3 = new Image("img/pic3.jpeg", 271, 203, 2);
let img4 = new Image("img/pic4.jpeg", 304, 203, 3);
let img5 = new Image("img/pic5.jpeg", 271, 203, 4);
let img6 = new Image("img/pic6.jpeg", 267, 213, 5);
let img7 = new Image("img/pic7.jpeg", 331, 221, 6);
let img8 = new Image("img/pic8.jpeg", 488, 275, 7);

let images = [img1, img2, img3, img4, img5, img6, img7, img8];
// 
// Simple functions 
// 

// Close Pop-up

let closePopUp = function () {
    let popUp = document.querySelector('#pop-up');
    popUp.style.display = "none";
    loadImagesBlocks();
}

// Open Pop-up

let refreshPopUp = function () {
    let popUp = document.querySelector('#pop-up');
    popUp.style.display = "grid";

    let currentId = popUp.dataset.id;

    let popUpDislikes = document.querySelector('.js-popUpDislikes');
    popUpDislikes.innerHTML = images[currentId].dislike;

    let popUpLikes = document.querySelector('.js-popUpLikes');
    popUpLikes.innerHTML = images[currentId].like;

    let popUpNumComments = document.querySelector('.js-popUpNumComments');
    popUpNumComments.innerHTML = `Comments: ${images[currentId].comments.length}`;

    images.forEach(item => {
        if (item.id == currentId) {
            item.addComments();
        }
    });
}
let openPopUp = function () {
    let popUp = document.querySelector('#pop-up');
    popUp.style.display = "grid";

    let currentId = this.dataset.id;
    popUp.dataset.id = currentId;
    let currentImageBlock = images[currentId];

    let popUpImage = document.querySelector('.js-popUpImage');
    popUpImage.src = currentImageBlock.src;

    refreshPopUp();
}

// Load blocks

let loadImagesBlocks = function () {
    let mainInner = document.querySelector('.main__inner');
    while (mainInner.lastChild.id !== 'js-loadPic') {
        mainInner.removeChild(mainInner.lastChild);
    }
    images.forEach(item => {
        item.addBlock();
    });

    let Block = document.querySelectorAll('.js-Block');
    Block.forEach(item => {
        item.addEventListener('click', openPopUp);
    });

    let close = document.querySelector(".js-closeBtn");
    close.addEventListener('click', closePopUp);
}
loadImagesBlocks();
// 
// Add like/dislike
// 

// Add like

let addLike = function (event) {
    let popUp = document.querySelector('#pop-up');
    event.preventDefault();
    let currentId = popUp.dataset.id;
    images[currentId].like += 1;
    refreshPopUp();
}
let likeButton = document.querySelector('.js-like');
likeButton.addEventListener('click', addLike);
// Add dislike
let addDislike = function (event) {
    let popUp = document.querySelector('#pop-up');
    event.preventDefault();
    let currentId = popUp.dataset.id;
    images[currentId].dislike += 1;
    refreshPopUp();
}
let dislikeButton = document.querySelector('.js-dislike');
dislikeButton.addEventListener('click', addDislike);

// Add comment

let addCommentPopUp = function () {
    let popUp = document.querySelector('#pop-up');
    let currentId = popUp.dataset.id;
    let nickname = document.querySelector('#nickname');
    let review = document.querySelector('#review');
    event.preventDefault();

    let newDate = function () {
        let date = new Date();

        let day = date.getDate();
        if (day < 10) day = '0' + day;

        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;

        let year = date.getFullYear() % 100;
        if (year < 10) year = '0' + year;

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    let newComment = {
        author: nickname.value,
        text: review.value,
        date: newDate(),
    }

    images[currentId].comments.push(newComment);
    refreshPopUp();
}
let btnAddNewComment = document.querySelector('.js-btnAddNewComment');
btnAddNewComment.addEventListener('click', addCommentPopUp);

//  Add new image

let addNewImage = function () {
    var fr = new FileReader();
    fr.onload = function (e) {
        let templateNewImage = document.querySelector('#newImage');
        templateNewImage.src = e.target.result;
        templateNewImage.onload = function () {
            let newId = images.length;
            let newImageSrc = templateNewImage.src;
            let newImageWidth = this.width;
            let newImageheight = this.height;
            let newImage = new Image(newImageSrc, newImageWidth, newImageheight, newId);
            images.push(newImage);
            loadImagesBlocks();
        };
    }
    fr.readAsDataURL(this.files[0]);
}
let btnAddNewImage = document.querySelector('#load-pic');
btnAddNewImage.addEventListener('change', addNewImage);