const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

//корзина (cart)

const buttonCart = document.querySelector('.button-cart');
const buttonProfile = document.querySelector('.button-profile');
const modelCard = document.querySelector('#modal-cart');
const viewAll = document.querySelectorAll('.view-all');
const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');
const longGoodsList = document.querySelector('.long-goods-list');
const cartTableGoods = document.querySelector('.cart-table__goods');
const cardTableTotal = document.querySelector('.card-table__total')
const loginUser = document.querySelector('.auth-submit');
const regUser = document.querySelector('.auth-submit-reg');

const getGoods = async function() {
	const result = await fetch('db/db.json');
	if(!result.ok) {
		throw 'Ошибочка вышла ' + result.status;
	}
	return await result.json();
};

const cart  = {
	cartGoods: [],
	renderCart(){
		cartTableGoods.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count}) => {
			const trGood = document.createElement('tr');
			trGood.className = 'cart-item';
			trGood.dataset.id = id;

			trGood.innerHTML = `
				<td>${name}</td>
				<td>${price}$</td>
				<td><button class="cart-btn-minus">-</button></td>
				<td>${count}</td>
				<td><button class="cart-btn-plus">+</button></td>
				<td>${price * count}$</td>
				<td><button class="cart-btn-delete">x</button></td>
			`;
			cartTableGoods.append(trGood);
		});

		const totalPrice = this.cartGoods.reduce((sum, item) => {
			return sum + item.price * item.count;
		}, 0);
		cardTableTotal.textContent = totalPrice + '$';
	},
	deleteGood(id){
		this.cartGoods = this.cartGoods.filter(item => id !== item.id);
		this.renderCart();
	},
	minusGood(id){
		for(const item of this.cartGoods) {
			if(item.id === id) {
				if(item.count <= 1) {
					this.deleteGood(id);
				} else { 
					item.count--;
				}
				break;
			}
		}
		this.renderCart();
	},
	plusGood(id){
		for(const item of this.cartGoods) {
			if(item.id === id) {
				item.count++;
				break;
			}
		}
		this.renderCart();
	},
	addCartGoods(id){
		const goodItem = this.cartGoods.find(item => item.id === id);
		if(goodItem){
			this.plusGood(id);
		} else {
			getGoods()
				.then(data => data.find(item => item.id === id))
				.then(({ id, name, price}) => {
					this.cartGoods.push({
						id,
						name,
						price,
						count: 1
					})
				});
		}
	},
};

document.body.addEventListener('click', event => {
	const addToCart = event.target.closest('.add-to-cart');

	if(addToCart){
		cart.addCartGoods(addToCart.dataset.id);
	}
});

cartTableGoods.addEventListener('click', event => {
	const target = event.target ;

	if(target.tagName === "BUTTON") {
		const id = target.closest('.cart-item').dataset.id;

		if(target.classList.contains('cart-btn-delete')) {
			cart.deleteGood(id);
		}
		if(target.classList.contains('cart-btn-minus')) {
			cart.minusGood(id);
		}
		if(target.classList.contains('cart-btn-plus')) {
			cart.plusGood(id);
		}
	}
});

const openModel = function(){
	cart.renderCart();
	modelCard.classList.add('show');
}; 

const openProfile = function(){
	cart.renderCart();
	modelCard.classList.add('show');
}; 

const closeModel = function(){
	modelCard.classList.remove('show');
}; 

buttonCart.addEventListener('click', openModel);

//закрытие корзины по клику в не её и по клику на крестик

modelCard.addEventListener('click', function(event) {
	const target = event.target;
	if(target.classList.contains('overlay') || target.classList.contains('modal-close')) {
		closeModel();
	}
});

//скрол (scroll smooth)

(function(){
	const scrollLinks = document.querySelectorAll('a.scroll-link');
	for(const scrollLink of scrollLinks){
		scrollLink.addEventListener('click', event => {
			event.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}
})();

//goods
const showAcsessories = document.querySelectorAll('.show-acsessories');
const showClothing = document.querySelectorAll(".show-clothing");

const createCard = function(objCard) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	card.innerHTML = `
		<div class="goods-card">
		${objCard.label ? `<span class="label">${objCard.label}</span>` : ''}
			
			<img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
			<h3 class="goods-title">${objCard.name}</h3>
			<p class="goods-description">${objCard.description}</p>
			<button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
				<span class="button-price">$${objCard.price}</span>
			</button>
		</div>`;
	return card;
};

const renderCards = function(data) {
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	longGoodsList.append(...cards);
	document.body.classList.add('show-goods');
};

const showAll = function(event) {
	event.preventDefault();
	getGoods().then(renderCards);
};

viewAll.forEach(function(elem) {
	elem.addEventListener('click', showAll);
});

const filterCards = function(field, value) {
	getGoods()
		.then(data => data.filter(good => good[field] === value))
		.then(renderCards);
};

navigationLink.forEach(function(link) {
	link.addEventListener('click', function(event) {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value);
	});
});

showAcsessories.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'Accessories');
	});
});
showClothing.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'Clothing');
	});
});
