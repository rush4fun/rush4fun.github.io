let icebergTop = document.querySelector(".iceberg-top");
let icebergBottom = document.querySelector(".iceberg-bottom");
let boat = document.querySelector(".boat");
let cat = document.querySelector(".cat");
let rocketOne = document.querySelector(".rocket1");
let rocketTwo = document.querySelector(".rocket2");
let rocketThree = document.querySelector(".rocket3");
let boom = document.querySelector(".boom");
let popUp = document.querySelector("#modal");

window.addEventListener("click", function() {
	icebergTop.style.cssText  = "animation: iceberg-top-crash 3s linear forwards; animation-delay: 2.6s;";
	icebergBottom.style.cssText  = "animation: iceberg-bottom-crash 3s linear forwards;	animation-delay: 2.6s;";
	boat.style.cssText  = "animation: boat-hit-iceberg 3s linear forwards;";
	cat.style.cssText  = "animation: cat-out 10s linear forwards;";
	rocketOne.style.cssText  = "animation: rocket1-boom 2s linear forwards; animation-delay: 3s;";
	rocketTwo.style.cssText  = "animation: rocket2-boom 2s linear forwards; animation-delay: 3s;";
	rocketThree.style.cssText  = "animation: rocket3-boom 2s linear forwards; animation-delay: 3s;";
	boom.style.cssText  = "animation: boom 2s ease forwards; animation-delay: 5s;";
	popUp.style.cssText  = "animation: pop-up 1s ease forwards; animation-delay: 7s;";
})