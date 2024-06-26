const itemStore = [
    {description:"lorem iptsu",quantity:5,store_id:1,id:1,color:'gray',name:"tshirt",imgPath:"./tshirts.png",img_name:"tshirt",category:"clothes",price:10},
    {description:"lorem iptsu",quantity:5,store_id:1,id:2,color:'orange',name:"pants",imgPath:"./pants",img_name:"pants",category:"clothes",price:15},
    {description:"lorem iptsu",quantity:5,store_id:1,id:3,color:'red',name:"short",imgPath:"./shorts.png",img_name:"shorts",category:"clothes",price:30},
    {description:"lorem iptsu",quantity:5,store_id:1,id:4,color:'yellow',name:"nike",imgPath:"./dress.png",img_name:"dress",category:"clothes",price:75},
    {description:"lorem iptsu",quantity:5,store_id:2,id:5,color:'black',name:"jordan",imgPath:"./jordan.png",img_name:"jordan",category:"shoes",price:95},
    {description:"lorem iptsu",quantity:5,store_id:2,id:6,color:'black',name:"nike",imgPath:"./nike.png",img_name:"nike",category:"shoes",price:85},
    {description:"lorem iptsu",quantity:5,store_id:2,id:7,color:'blue',name:"sweater",imgPath:"./sweater.png",img_name:"sweater",category:"clothes",price:25},
    {description:"lorem iptsu",quantity:5,store_id:2,id:8,color:'green',name:"jacket",imgPath:"./jacket.png",img_name:"jacket",category:"clothes",price:50},
    {description:"lorem iptsu",quantity:5,store_id:2,id:9,color:'pink',name:"dress",imgPath:"./dress.png",img_name:"dress",category:"clothes",price:45},
    {description:"lorem iptsu",quantity:5,store_id:2,id:10,color:'white',name:"sneakers",imgPath:"./sneakers.png",img_name:"sneakers",category:"shoes",price:80},
    {description:"lorem iptsu",quantity:5,store_id:2,id:11,color:'gray',name:"boots",imgPath:"./boots.png",img_name:"boots",category:"shoes",price:120},
    {description:"lorem iptsu",quantity:5,store_id:2,id:12,color:'red',name:"high heels",imgPath:"./heels.png",img_name:"heels",category:"shoes",price:90},
    {description:"lorem iptsu",quantity:5,store_id:2,id:13,color:'black',name:"sunglasses",imgPath:"./sunglasses.png",img_name:"sunglasses",category:"accessories",price:20},
    {description:"lorem iptsu",quantity:5,store_id:2,id:14,color:'brown',name:"watch",imgPath:"./watch.png",img_name:"watch",category:"accessories",price:35},
    {description:"lorem iptsu",quantity:5,store_id:2,id:15,color:'silver',name:"necklace",imgPath:"./necklace.png",img_name:"necklace",category:"accessories",price:15},
    {description:"lorem iptsu",quantity:5,store_id:3,id:16,color:'gold',name:"earrings",imgPath:"./earrings.png",img_name:"earrings",category:"accessories",price:10},
    {description:"lorem iptsu",quantity:5,store_id:3,id:17,color:'purple',name:"backpack",imgPath:"./backpack.png",img_name:"backpack",category:"bags",price:40},
    {description:"lorem iptsu",quantity:5,store_id:3,id:18,color:'black',name:"wallet",imgPath:"./wallet.png",img_name:"wallet",category:"bags",price:25},
    {description:"lorem iptsu",quantity:5,store_id:3,id:19,color:'blue',name:"beanie",imgPath:"./beanie.png",img_name:"beanie",category:"accessories",price:12},
    {description:"lorem iptsu",quantity:5,store_id:3,id:20,color:'gray',name:"gloves",imgPath:"./gloves.png",img_name:"gloves",category:"accessories",price:8},
    {description:"lorem iptsu",quantity:5,store_id:3,id:21,color:'black',name:"scarf",imgPath:"./scarf.png",img_name:"scarf",category:"accessories",price:20},
    {description:"lorem iptsu",quantity:5,store_id:3,id:22,color:'white',name:"t-shirt",imgPath:"./tshirt-white.png",img_name:"tshirt-white",category:"clothes",price:18},
    {description:"lorem iptsu",quantity:5,store_id:3,id:23,color:'green',name:"hoodie",imgPath:"./hoodie.png",img_name:"hoodie",category:"clothes",price:45},
    {description:"lorem iptsu",quantity:5,store_id:3,id:24,color:'blue',name:"sweatshirt",imgPath:"./sweatshirt.png",img_name:"sweatshirt",category:"clothes",price:30},
    {description:"lorem iptsu",quantity:5,store_id:3,id:25,color:'brown',name:"boots",imgPath:"./boots.png",img_name:"boots",category:"shoes",price:65},
    {description:"lorem iptsu",quantity:5,store_id:3,id:26,color:'red',name:"sneakers",imgPath:"./sneakers.png",img_name:"sneakers",category:"shoes",price:55}
]
const stores = [
    {
      imgPath: "/path/to/image1.jpg",
      category: "Electronics",
      name: "Smartphone",
      description: "A high-performance smartphone with advanced features.",
      user_id: 1,
      id:1
    },
    {
      imgPath: "/path/to/image2.jpg",
      category: "Clothing",
      name: "T-Shirt",
      description: "A comfortable cotton t-shirt suitable for everyday wear.",
      user_id: 2,
      id:2
    },
    {
      imgPath: "/path/to/image3.jpg",
      category: "Books",
      name: "Fantasy Novel",
      description: "An epic fantasy novel filled with magic and adventure.",
      user_id: 3,
      id:3
    }
  ];
  
const users = [
    {
        id:1,
      name: "alice",
      password: "password123"
    },
    {
        id:2,
      name: "bob",
      password: "securepass456"
    },
    {
        id:3,
      name: "charlie",
      password: "letmein789"
    }
  ];
  
const status = [{
  id: 1,
  store_id: 1,
  product_id: 1,
  requester_id: 2,
  status: 'open'
},
{
  id: 2,
  store_id: 1,
  product_id: 2,
  requester_id: 3,
  status: 'completed'
},
{
  id: 3,
  store_id: 1,
  product_id: 3,
  requester_id: 3,
  status: 'cancelled'
},
{
  id: 4,
  store_id: 2,
  product_id: 5,
  requester_id: 1,
  status: 'cancelled'
},
{
  id: 5,
  store_id: 2,
  product_id: 6,
  requester_id: 3,
  status: 'open'
},
{
  id: 6,
  store_id: 2,
  product_id: 7,
  requester_id: 1,
  status: 'completed'
},
{
  id: 7,
  store_id: 3,
  product_id: 6,
  requester_id: 2,
  status: 'completed'
},
{
  id: 8,
  store_id: 3,
  product_id: 17,
  requester_id: 2,
  status: 'cancelled'
},
{
  id: 9,
  store_id: 3,
  product_id: 16,
  requester_id: 1,
  status: 'open'
}
]

const defaultLimit = 25
const maximumLimit = 25
module.exports = {itemStore,defaultLimit,maximumLimit,stores,users,status}