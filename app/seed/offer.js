/* * ************************************************************ 
 * Date: 05 Nov, 2017
 * Programmer: Pankaj Jatav <pankajjatav7777@gmail.com>
 * Description : Seed Data for offer collection
 * Typescript file offer.js
 * *************************************************************** */

module.exports = [
	{
		_id: "59fe15380000000000000001",
		product_id: "59fe07280000000000000000",
		name: "Gets a 3 for 2 deals on Classic Ads",
		type: "FREE",
		code: "GOODS",
		offer_amount: 1,
		quantity: 3
	},
	{
		_id: "59fe15380000000000000002",
		product_id: "59fe07280000000000000000",
		name: "Gets a 5 for 4 deal on Classic Ads",
		type: "FREE",
		code: "GOODS",
		offer_amount: 1,
		quantity: 5
	},
	{
		_id: "59fe15380000000000000003",
		product_id: "59fe07280000000000000001",
		name: "Gets a discount on Standout Ads where the price drops to $299.99 per ad",
		type: "DISCOUNT",
		code: "PRICE",
		offer_amount: 23,
		quantity: 1
	},
	{
		_id: "59fe15380000000000000004",
		product_id: "59fe07280000000000000001",
		name: "Gets a discount on Standout Ads where the price drops to $309.99 per ad",
		type: "DISCOUNT",
		code: "PRICE",
		offer_amount: 13,
		quantity: 1
	},
	{
		_id: "59fe15380000000000000005",
		product_id: "59fe07280000000000000002",
		name: "Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad",
		type: "DISCOUNT",
		code: "PRICE",
		offer_amount: 15,
		quantity: 4
	},	
	{
		_id: "59fe15380000000000000006",
		product_id: "59fe07280000000000000002",
		name: "Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad",
		type: "DISCOUNT",
		code: "PRICE",
		offer_amount: 5,
		quantity: 3
	},



]