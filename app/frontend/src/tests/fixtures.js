export const  items = [
    {
        id: 1,
        name: 'Item 1',
        price: 10.99,
        imgPath: '/images/item1.jpg',
        quantity:5
      },
      {
        id: 2,
        name: 'Item 2',
        price: 19.99,
        imgPath: '/images/item2.jpg',
        quantity:3
      },
      {
        id: 3,
        name: 'Item 3',
        price: 14.99,
        imgPath: '/images/item3.jpg',
        quantity:10
      },
      {
        id: 4,
        name: 'Item 4',
        price: 29.99,
        imgPath: '/images/item4.jpg',
        quantity:3
      },
      {
        id: 5,
        name: 'Item 5',
        price: 24.99,
        imgPath: '/images/item5.jpg',
        quantity:1
      }
]

export const mapExpect = (array1,array2,price)=>{
  array1.map((_,ind,array)=>{
      expect(array[ind].name).toEqual(array2[ind].name)
      expect(array[ind].id).toEqual(array2[ind].id)
      expect(array[ind].quantity).toEqual(array2[ind].quantity)
      if(price)expect(array[ind].price).toEqual(array2[ind].price)
    })
}