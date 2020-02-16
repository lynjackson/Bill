export function setMenu(menuObj){
  return {
	   type: 'SETMENU',
	    payload: menuObj,
    };
}

export function fullMenu(menuObj){
  return {
	   type: 'FULLMENU',
	    payload: menuObj,
    };
}

export function removeCat(category, menu){

	const cat = category;
	const {[cat]: value, ...updatedMenu } = menu;

	return {
	   type: 'EDITMENU',
	    payload: updatedMenu,
    };
}

export function addCat(category, fullMenu, omenu){
	//take category, which is passed from fullMenu.
	//locate that property on fullMenu
	//add that category to o_menu, if it doesn't already have it.

const updatedMenu = {
	...omenu,
	[category]: fullMenu[category]
}


	return {
	   type: 'EDITMENU',
	    payload: updatedMenu,
    };
}

export function setCategory(category){
	return{
	type: 'CAT',
	payload:{
		category: category
	}
};
}

export function addItem(currentItem){
	return {
	   type: 'ADD',
	    payload: currentItem,
    };
}

export function removeItem(itemName){
	return {
	   type: 'REMOVE',
	    payload: itemName,
    };
}

export function setCurrentItem(currentItem){
  return {
	   type: 'SETITEM',
	    payload: currentItem,
    };
}



export function submitOrder(orderArray){
  return {
	   type: 'SUBMIT',
	    payload: orderArray
    };
}

export function theOrder(orderArray){
  return {
	   type: 'ORDERUP',
	    payload: orderArray
    };
}

export function updateName(name){
  return {
     type: 'UPDATENAME',
     payload: name
    };
}

export function addCustomPrice(price){
  return {
     type: 'ADDCUSTOM',
     payload: price
    };
}

export function subtractCustomPrice(price){
  return {
     type: 'SUBTRACTCUSTOM',
     payload: price
    };
}

export function yPos(key, value){
  return {
     type: 'YPOS',
     payload:{
			 key: key,
			 value: value,
		 }
    };
}

export function emptyCart(){
  return {
	   type: 'EMPTY'
    };
}

export function setTip(tip){
  return {
	   type: 'SETTIP',
		 payload: tip
    };
}

export function fetchAPIData(){
	return {
		type: 'FETCH',
		payload: fetch('https://api.foursquare.com/v2/venues/4adaa371f964a520ec2321e3/menu?client_id=KUZ5DS21RPAGXYPZGDG1R2ACKA43X2SLTY3VNX5WN3PZLYYS&client_secret=WJ2HM3V5YFXSCDQSIVBDCJUCCSQLPRAWLXIZAXWFIRMGALVS&v=20180323', {
	        mode: 'cors',
	      }).then((resp) => resp.json())
	};
}

export function toFirebase(db){
  return {
	   type: 'FIREBASE',
		 payload: db
    };
}

export function clearFirebase(db){
  return {
	   type: 'CLEARBASE',
		 payload: db
    };
}

export function updatePrice(db){
  return {
	   type: 'UPDATEPRICE',
		 payload: db
    };
}

export function updateTable(price){
  return {
	   type: 'UPDATETABLE',
		 payload: {
			 price: price
		 }
    };
}
