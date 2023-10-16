"use strict";


import { data } from "../script.js";
import { createItemRow } from "./addEl.js";



const lol = document.querySelector('.page-number-text')
lol.innerHTML = '1-10 of 18'

let itemsPage = 1;
let itemsView = 10;
let leftButton = document.querySelector('.left-btn');
let rightButton = document.querySelector('.right-btn');
const itemList = document.querySelector(".tbody");
const removeItems = (elem) => {
	const items = document.querySelectorAll(elem);
	for (let i = 0; i < items.length; i++) {
		items[i].remove();
	}
}
const renderItems = () => {
	rightButton.addEventListener('click', () => {
		removeItems('tbody .item');
		itemsPage += 1;
		for (let i = 0; i < itemsView; i++) {
			if (data[itemsPage * itemsView]) {
				itemList.append(createItemRow(data[i]));
			} 
			else {
				if (data[itemsView + 1]) {
					itemList.append(createItemRow(data[itemsView + i]));
					const lol = document.querySelector('.page-number-text')
					lol.innerHTML = '11-18 of 18'
				}
			}
		}
	});
	
	leftButton.addEventListener('click', () => {
		if (!itemsPage <= 1) {
			removeItems('tbody .item');
			itemsPage -= 1;
			for (let i = 0; i < itemsView; i++) {
				if (data[itemsPage * itemsView]) {
					itemList.append(createItemRow(data[i]));
					const lol = document.querySelector('.page-number-text')
					lol.innerHTML = '1-10 of 18'
				} else {
					if (data[itemsView + 1]) {
						itemList.append(createItemRow(data[itemsView + i]));
					}
				}
			}
		}
	});

	for (let i = 0; i < itemsView; i++) {
		if (data[itemsPage * itemsView]) {
			itemList.append(createItemRow(data[i]));
		} else {
			if (data[itemsView + 1]) {
				itemList.append(createItemRow(data[itemsView + i]));
			}
		}
	}
};
export {renderItems};