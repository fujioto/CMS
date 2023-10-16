"use strict";


import { data, popup} from "../script.js";
import {setStorage,clearStorage} from "../modules/localStorage.js"
import { createItemRow } from "./addEl.js";
const itemList = document.querySelector(".tbody");

const popupControl = (addProductBtn, closeBtn, popup) => {
	const name = document.querySelector(".textarea-name");
	const category = document.querySelector(".textarea-category");
	const units = document.querySelector(".textarea-units");
	const discount = document.querySelector(".textarea-discount");
	const description = document.querySelector(".textarea-description");
	const count = document.querySelector(".textarea-amount");
	const price = document.querySelector(".textarea-price");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	addProductBtn.addEventListener('click', e => {
		popup.classList.add("active");
		e.stopPropagation();
	});
	closeBtn.addEventListener('click', ()=> {
		name.value = "";
		category.value = "";
		units.value = "";
		discount.value = "";
		description.value = "";
		count.value = "";
		price.value = "";
		footerSum.value = "";
		checkbox.checked = false;
		popupClose();		
	});
	document.onclick = function(e){
		if(!e.target.closest(".pop-up")) {
			name.value = "";
			category.value = "";
			units.value = "";
			discount.value = "";
			description.value = "";
			count.value = "";
			price.value = "";
			footerSum.value = "";
			checkbox.checked = false;
			popupClose();
		};
	};
};

const popupClose = () => {
	const popup = document.querySelector(".pop-up")
	popup.classList.remove("active");
};

const increment = () => {
	return data.length + 1;
};

const formControl = (form, data) => {
	const discount = document.querySelector(".textarea-discount");
	const count = document.querySelector(".textarea-amount");
	const price = document.querySelector(".textarea-price");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	
	discount.addEventListener("input", () => {
		if (discount.value.length > 0 && discount.value != 0) {
			checkbox.checked = true;
		} else {
			checkbox.checked = false;
		}
	});
	if (checkbox.checked == true) {
		discount.removeAttribute("disabled")
		discount.setAttribute("required", '');
	}
	checkbox.addEventListener("change", ()=> {
		if (checkbox.checked == true) {
			footerSum.innerHTML = (+(price.value) - (discount.value * (1 / 100) * price.value)) * +(count.value);
			discount.removeAttribute("disabled")
			discount.setAttribute("required", '');
		} else {
			footerSum.innerHTML = count.value * price.value;
			console.log(footerSum);
			discount.setAttribute("disabled", true)
			};
	});
	discount.addEventListener("input", ()=> {
		footerSum.innerHTML = (+(price.value) - (discount.value * (1 / 100) * price.value)) * +(count.value);
	})
	count.addEventListener("input", ()=> {
		if (document.querySelector(".checkbox").checked) {
			footerSum.innerHTML = ((price.value) - (discount.value * (1 / 100) * price.value)) * +(count.value);
		} else {
			footerSum.innerHTML = count.value * price.value;
		};
	});
	price.addEventListener("input", ()=> {
		if (document.querySelector(".checkbox").checked) {
			footerSum.innerHTML = (+(price.value) - (discount.value * (1 / 100) * price.value)) * +(count.value);
		} else {
			footerSum.innerHTML = count.value * price.value;
		};
	});

	form.addEventListener("submit", e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newItem = Object.fromEntries(formData);
		console.log(newItem);
		const discount = document.querySelector(".textarea-discount");
		const addImg = document.querySelector(".add-img")
		let file = addImg.files[0]
		newItem.id = increment();
		if (file) {
			newItem.haveImg = true;
		} else {
			newItem.haveImg = false;
		}
		if (document.querySelector(".checkbox").checked) {
			newItem.hasDiscount = true;
			
		} else {
			newItem.hasDiscount = false;
		};

		if (newItem.hasDiscount == true) {
			newItem.total = (+(newItem.price) - (discount.value * (1 / 100) * newItem.price)) * + (newItem.count);
			newItem.price = (+(newItem.price) - (discount.value * (1 / 100) * newItem.price));
		} else {
			newItem.total = +(newItem.count) * +(newItem.price);
		};
		data.push(newItem);
		addItem(newItem, itemList);
		setStorage();
		e.target.reset();
		popupClose();
		location.reload();
		calculateTotal();
		
	});
};
const calculateTotal = () => {
	let sum = document.querySelector(".sum");
	let value = 0;
	data.forEach(item => {
		value += (+(item.price) - (item.discount * (1 / 100) * item.price)) * + (item.count);
	});
	sum.innerHTML = value;
	return value;
}

const addItem = (item, itemList) => {
	itemList.append(createItemRow(item));
};

const deleteFunction = () => {
	const deleteIcons = document.querySelectorAll(".deleteIcon");
	deleteIcons.forEach(icon => {
		icon.addEventListener("click", (e)=> {
			e.preventDefault();
			e.stopPropagation();
			const target = e.target;
			target.parentNode.parentNode.remove();
			
			clearStorage(target);
			calculateTotal();
			location.reload()
		});
	});
};

const editItemsFunction = () => {
	const editIcons = document.querySelectorAll(".editIcon");
	const submitBtn = document.querySelector(".footer__btn");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	editIcons.forEach(icon => {
		icon.addEventListener("click", e => {
			const target = e.target;
			e.preventDefault();
			e.stopPropagation();
			popup.classList.add("active");
			const name = document.querySelector(".textarea-name");
			const category = document.querySelector(".textarea-category");
			const units = document.querySelector(".textarea-units");
			const discount = document.querySelector(".textarea-discount");
			const description = document.querySelector(".textarea-description");
			const count = document.querySelector(".textarea-amount");
			const price = document.querySelector(".textarea-price");
			const addImg = document.querySelector(".add-img")
			
			data.forEach(item => {
				if (+(item.id) == +(target.parentNode.parentNode.childNodes[0].textContent)) {
					if (item.hasDiscount == true) {
						checkbox.checked = true;
						discount.removeAttribute("disabled")
					}
					let file = addImg.files[0]
					name.value = item.title;
					category.value = item.category;
					units.value = item.units;
					discount.value = item.discount;
					description.value = item.description;
					count.value = item.count;
					price.value = item.price;
					footerSum.innerHTML = (+(item.price) - (item.discount * (1 / 100) * item.price)) * + (item.count)
				};
				if (popup.classList.contains("active")) {
					submitBtn.addEventListener("click", ()=> {
						item.id = item.id;
						item.name = name.value;
						item.category = category.value;
						item.discount = discount.value;
						item.description = description.value;
						item.units = units.value;
						item.count = count.value;
						item.price = price.value;
						data.splice(this, 1);
						footerSum.innerHTML = item.total;
						location.reload();

					});
				};
				setStorage();
			});
			calculateTotal();
		});
	});
} ;

const changeToNumber = e => {
	const value = e.value;
	e.value = value.replace(/\D/g, '');
};
const removeSpace = e => {
	if (e.value.charAt(0) == ' ') {
		e.value = "";
	}
}

export {popupControl, popupClose, calculateTotal, increment, formControl, addItem, deleteFunction, editItemsFunction, removeSpace, changeToNumber}
