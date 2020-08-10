
cart_1 = [{
    id: "32",
    name: "Maximum Overload",
    price: "799.000",
    image: "/album-cover-and-audio/Maximum_Overload/cover.jpg",
    bandName: "DragonForce",
    count: 10
},
{
    id: "10",
    name: "Lối Thoát",
    price: "200.000",
    image: "/album-cover-and-audio/Loi_Thoat/cover.jpg",
    bandName: "Microwave",
    count: 9
},
{
    id: "25",
    name: "Angels Fall First",
    price: "400.000",
    image: "/album-cover-and-audio/Angels_Fall_First/cover.jpg",
    bandName: "Nightwish",
    count: 3
},
{
    id: "5",
    name: "Đất Việt",
    price: "350.000",
    image: "/album-cover-and-audio/Dat_Viet/cover.jpg",
    bandName: "Bức Tường",
    count: 1
}
]

cart_2 = [{
    bandName: "Microwave",
    count: 2,
    id: "10",
    image: "/album-cover-and-audio/Loi_Thoat/cover.jpg",
    name: "Lối Thoát",
    price: "200.000"
},
{
    bandName: "Nightwish",
    count: 2,
    id: "26",
    image: "/album-cover-and-audio/Century_Child/cover.jpg",
    name: "Century Child",
    price: "420.000"
},
{
    bandName: "DragonForce",
    count: 2,
    id: "32",
    image: "/album-cover-and-audio/Maximum_Overload/cover.jpg",
    name: "Maximum Overload",
    price: "799.000"
}
]

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

    console.log(commonItem)
    const itemOnlyInCart_1 = cart_1.filter(item => !commonItemIndex.includes(item.id));
    console.log(itemOnlyInCart_1)
    const itemOnlyInCart_2 = cart_2.filter(item => !commonItemIndex.includes(item.id));
    console.log(itemOnlyInCart_2)
    const shoppingCart = [...itemOnlyInCart_1,...commonItem,...itemOnlyInCart_2];
    return shoppingCart;
}