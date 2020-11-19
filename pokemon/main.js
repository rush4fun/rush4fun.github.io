// PRELOADER
function preloader() {
	const MAIN = document.querySelector('.js-main');
	if (MAIN.innerHTML == '') {
		MAIN.innerHTML = "<p class='preloader'>Please wait a minute, we are catching all pokemons</p><img src='img/pokeball.svg' class='preloader__img'>";
	}
}
// OPEN TAGS LIST
function openTagsList() {
	const BTN_TAG_OPEN = document.querySelector('.js-tagBtn');
	BTN_TAG_OPEN.addEventListener('click', function () {
		event.preventDefault();
		const TAG_LIST = document.querySelector('.js-tagList');
		TAG_LIST.classList.toggle('js-tagList--open');
	})
}
// CLASS TO CREATE POKEMON
class pokemonCreate {
	constructor(name, img, types, stats) {
		this.name = name;
		this.img = img;
		this.types = types;
		this.stats = stats;
	}
	createPokemonBlock() {
		const MAIN = document.querySelector('.js-main');

		let card = document.createElement('div');
		card.classList.add('card');
		MAIN.appendChild(card);

		let cardInner = document.createElement('div');
		cardInner.classList.add('card__inner');
		card.appendChild(cardInner);

		let title = document.createElement('h2');
		title.classList.add('text', 'title');
		title.innerText = this.name;
		cardInner.appendChild(title);

		let imgWrapper = document.createElement('div');
		imgWrapper.classList.add('img__wrapper');
		cardInner.appendChild(imgWrapper);

		let imgPok = document.createElement('img');
		imgPok.classList.add('img');
		imgPok.src = this.img;
		imgWrapper.appendChild(imgPok);


		// TAG
		let tagList = document.createElement('div');
		tagList.classList.add('tag__list');
		cardInner.appendChild(tagList);

		this.types.forEach(item => (function () {
			let tagWrapper = document.createElement('div');
			tagWrapper.classList.add('tag__wrapper');
			tagList.appendChild(tagWrapper);

			let tagItem = document.createElement('span');
			tagItem.classList.add('tag__item', 'text');
			tagItem.innerText = item.type.name;
			tagWrapper.appendChild(tagItem);
		})())

		// END TAG

		// STATS
		let stats = document.createElement('div');
		stats.classList.add('stats');
		cardInner.appendChild(stats);

		let statsInner = document.createElement('dl');
		statsInner.classList.add('stats__inner');
		stats.appendChild(statsInner);

		this.stats.forEach(item => (function () {
			let statsTitle = document.createElement('dt');
			statsTitle.classList.add('stats__title', 'text');
			statsTitle.innerText = item.stat.name;
			statsInner.appendChild(statsTitle);

			let statsCount = document.createElement('dd');
			statsCount.classList.add('stats__count', 'text');
			statsCount.innerText = item.base_stat;
			statsInner.appendChild(statsCount);
		})())
		// END STATS

	}
}
// LOADING TAGS FROM URL
function loadingTags() {
	let allPoekmonTagsUrl = 'https://pokeapi.co/api/v2/type';

	fetch(allPoekmonTagsUrl)
		.then(function (response) {
			response.json()
				.then(function (pokemonTags) {
					const TAG_LIST = document.querySelector('.js-tagList');

					let allPokemonTags = pokemonTags.results;

					allPokemonTags.forEach(item => (function () {
						let tagItem = document.createElement('label');
						tagItem.classList.add('tags__item', 'text');
						tagItem.htmlFor = item.name;
						tagItem.innerText = item.name;

						let tag = document.createElement('input');
						tag.setAttribute("type", "checkbox");
						tag.classList.add('tag');
						tag.id = item.name;
						tagItem.appendChild(tag);

						TAG_LIST.appendChild(tagItem);
					})())
				})
		})
}

// LOADING POKEMON FROM URL
let listOfAllPokemos = []; 
let value = 10;
function loadingAllPokemons() {
	let allPokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=893';

	fetch(allPokemonUrl)
		.then(function (response) {
			response.json()
				.then(function (allPokemons) {
					loadPokemons(allPokemons.results);
				})
		})
}
function loadMainPage() {
	let selector = headerForm.selector;
	let selectOptions = selector.options;
	let inputSearch = headerForm.search;
	let searchbtn = document.querySelector('.js-searchBtn').addEventListener('click', function() {
		event.preventDefault();
		searchingPokemons();
	});

	clearPage();
	// PAGINATION
	loadPaginations(listOfAllPokemos);
	// CREATING PAGINATION
	function loadPaginations(allPokemonsArr) {
		let numPagination;
		for (let i = 0; i < selectOptions.length; i++) {
			if (selectOptions[i].selected) {
				numPagination = Math.ceil(allPokemonsArr.length / selectOptions[i].value);
			}
		}
		let pagination = document.querySelector('.js-pagination');
		pagination.innerHTML = '';

		for (let i = 1; i <= numPagination; i++) {
			let paginationItem = document.createElement('a');
			paginationItem.classList.add('pagination__item');
			paginationItem.innerText = i;

			pagination.appendChild(paginationItem);
		}
		let paginationItem = document.querySelectorAll('.pagination__item');
		paginationItem[0].classList.add('js-active');
	}

	function tagAction() {
		clearPage();
		let tagList = document.querySelectorAll('.tags__item--red');
		let tagText = [];
		for (let i = 0; i < tagList.length; i++) {
			if (tagText.indexOf(tagList[i].innerText) == -1) {
				tagText.push(tagList[i].innerText);
			} else {
				let currentIndex = tagText.indexOf(tagList[i].innerText);
				if (tagText.length == 1) {
					tagText = [];
				} else {
					tagText.splice(currentIndex, currentIndex);
				}
			}
		}
		if (tagText.length != 0) {
			for (let i = 0; i < listOfAllPokemos.length; i++) {
				let stringOfPokemonsTypes = JSON.stringify(listOfAllPokemos[i].types);
				let numOfCommonTags = 0;
				for (let j = 0; j < tagText.length; j++) {
					if ( stringOfPokemonsTypes.indexOf(tagText[j]) > -1) {
						numOfCommonTags++;
					}
				}
				if (numOfCommonTags == tagText.length) {
					listOfAllPokemos[i].createPokemonBlock();
				}
			}	
		} else {
			createNewPokemonsArr(value);
		}
	}
	// SEARCH
	inputSearch.addEventListener('keyup', searchingPokemons);
	function searchingPokemons() {
		let inputSearchValue = inputSearch.value;
		let chosenPokemos = [];
		if (inputSearchValue != 0) {
			for (let i = 0; i < listOfAllPokemos.length; i++) {
				let spliceNameOfPokemon = listOfAllPokemos[i].name.slice(0, inputSearchValue.length);
				if (spliceNameOfPokemon == inputSearchValue) {
					clearPage();
					chosenPokemos.push(listOfAllPokemos[i]);
				} else {
					clearPage();
				}
			}
		}
		else {
			clearPage();
			createNewPokemonsArr(value);		
		}
		for(let j = 0; j < chosenPokemos.length; j++) {
			chosenPokemos[j].createPokemonBlock();
		}
	}
	
	// Вешаем событие на элемент селектора
	selector.addEventListener('change', function () {
		checkSelectValue(value);
		loadPaginations(listOfAllPokemos);
		actionPagination();
	})
	// Проверяем значение элемента селект и вызываем функцию для загрузки массива отображаемых покемонов
	function checkSelectValue() {
		for (let i = 0; i < selectOptions.length; i++) {
			if (selectOptions[i].selected) {
				value = selectOptions[i].value;
				createNewPokemonsArr(value);
			}
		}

	}	
	// CHOSOSE TAG ITEM STYLING
	let stylingChosenTagItem = function () {
		let tagItemCheck = document.querySelectorAll('.tags__item [type=checkbox]');
		for (let i = 0; i < tagItemCheck.length; i++) {
			tagItemCheck[i].addEventListener('click', function () {
				let tagValue = this.id;
				this.closest('.tags__item').classList.toggle('tags__item--red');
				tagAction();
			})
		}
	}
	function createNewPokemonsArr(valueOfFun) {
		clearPage();
		for (let i = 0; i < valueOfFun; i++) {
			listOfAllPokemos[i].createPokemonBlock();
		}
	}
	function actionPagination() {
		let paginationList = document.querySelectorAll('.pagination__item');
		let numOfNotesOnPage;
		paginationList.forEach(item => item.addEventListener('click', function() {	
			clearPage();
			for (let i = 0; i < paginationList.length; i++) {
				paginationList[i].classList.remove('js-active');
			}
			this.classList.add('js-active');
			for (let i = 0; i < selectOptions.length; i++) {
				if (selectOptions[i].selected) {
					numOfNotesOnPage = selectOptions[i].value;
				}
			}
			let pagNum = this.innerText;
			let start = numOfNotesOnPage * (pagNum - 1);
			let end = numOfNotesOnPage * pagNum;
			for (let i = start; i < end; i++) {
				listOfAllPokemos[i].createPokemonBlock();
			}
			console.log(pagNum);
		}))
	}
	let init = function() {
		createNewPokemonsArr(value);
		stylingChosenTagItem();
		actionPagination();
	}
	init();
}
function clearPage() {
	const MAIN = document.querySelector('.js-main');
	MAIN.innerHTML = '';
}
clearPage();
function loadPokemons(newPokemonsArr) {
	if (newPokemonsArr.length > 1) {
		for (let i = 0; i < newPokemonsArr.length; i++) {
			let pokemonUrl = newPokemonsArr[i].url;
			loadPokemonsByUrl(pokemonUrl);
		}
	} else {
		let pokemonUrl = newPokemonsArr.url;
		loadPokemonsByUrl(pokemonUrl);
	}
	function loadPokemonsByUrl(url) {
		fetch(url)
			.then(function (response) {
				response.json()
					.then(function (pokemon) {
						let newPokemon = new pokemonCreate(pokemon.name, pokemon.sprites.front_default, pokemon.types, pokemon.stats);
						listOfAllPokemos.push(newPokemon);
							if (listOfAllPokemos.length == newPokemonsArr.length) {
							loadMainPage();
						}
					})
			})
	}
}
let init = function() {
	preloader();
	openTagsList();
	loadingTags();
	loadingAllPokemons();
}
document.addEventListener('DOMContentLoaded', init())