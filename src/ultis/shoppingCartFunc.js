function loadCartLocal(){//load infomation from qtv cart in localstorage
    if (localStorage.getItem('qtv-cart') === null) return null
    else {
        const shoppingCart = JSON.parse(localStorage.getItem('qtv-cart'))
        return shoppingCart
    }
}

function saveCartLocal(shoppingCart){//save infomation to qtv cart in localstorage
    localStorage.setItem('qtv-cart',JSON.stringify(shoppingCart));
}

function countItemInShoppingCart(shoppingCart){
    let totalItem = 0;
    for (let item of shoppingCart){
        const count = item.count || 0;
        totalItem += parseInt(count);
    }
    return totalItem;
}

function addItemToShoppingCart(prevShoppingCart, newItem){
    if (prevShoppingCart.length === 0) {
        prevShoppingCart = [{...newItem}];
        return prevShoppingCart;
    } 
    //check whether there are any item that has same Id with new Item  
    for (let item of prevShoppingCart){
        if (item.id === newItem.id){
            item.count += newItem.count;
            return prevShoppingCart;
        }
    }
    //if not, push newItem to cart
    prevShoppingCart.push(newItem);
    return prevShoppingCart
}

function Item (id, name, price, image, bandName, count = 1){
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.bandName = bandName;
    this.count = count;
    
}

function merge2shoppingCart(cart_1, cart_2){
    const commonItem = [];
    const commonItemIndex = []
    for (let i=0 ; i < cart_1.length; ++i ){
        for (let j = 0; j < cart_2.length; j++){
            if (cart_1[i].id === cart_2[j].id){
                let index = cart_1[i].id;
                commonItemIndex.push(index);
                let item = {...cart_1[i]};
                item.count = cart_1[i].count + cart_2[j].count;
                commonItem.push(item);
                break
            }
        }
    }
    
    const itemOnlyInCart_1 = cart_1.filter(item => !commonItemIndex.includes(item.id));
    const itemOnlyInCart_2 = cart_2.filter(item => !commonItemIndex.includes(item.id));
    const shoppingCart = [...itemOnlyInCart_1,...commonItem,...itemOnlyInCart_2];
    return shoppingCart;
}

export default {
    loadCartLocal,
    saveCartLocal,
    countItemInShoppingCart,
    addItemToShoppingCart,
    Item,
    merge2shoppingCart
}


