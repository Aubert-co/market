import { mapExpectAll } from "../tests/fixtures"
import { getCart, GetTimeCached, saveCart, saveTime ,cacheChangeQuantity, saveProducts, getProducts} from "./index"



describe("test",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
        jest.useFakeTimers()
        localStorage.clear() 
    })

    it("Should save the object corretly in the localStorage",()=>{
        expect(getCart()).toEqual([])
        const cart = [{id:3,name:'lucas',quantity:55},{id:4,name:'jose',quantity:5}]
        
        saveCart(cart)
        const localStorageDatas = JSON.parse(localStorage.getItem('cart'))
        const funcionGetCart = getCart()

        expect(localStorageDatas).toHaveLength(2)
        
        mapExpectAll(localStorageDatas,cart)
        mapExpectAll(localStorageDatas,funcionGetCart)
        mapExpectAll(funcionGetCart,cart)
       

    })
    it("When the quantity changes, it should update the correct item in the array inside localStorage.",()=>{
        const cart = [{id:3,name:'lucas',quantity:55},{id:4,name:'jose',quantity:5}]
        saveCart(cart)
        const newCart = cacheChangeQuantity({cart,id:cart[0].id,quantity:123})
        
        expect(newCart[0].quantity).toEqual(123)
        expect(newCart[1].quantity).toEqual(cart[1].quantity)
        saveCart(newCart)
        const getLocalDate = getCart()
        const localStorageDatas = JSON.parse(localStorage.getItem('cart'))
        
        mapExpectAll(getLocalDate,localStorageDatas)

        expect(localStorageDatas[0].quantity).not.toEqual(cart[0].quantity)
        mapExpectAll([cart[1]],[getLocalDate[1]])
        mapExpectAll([cart[1]],[localStorageDatas[1]])
    })
    it("When saving a new item, it should be saved correctly in localStorage.",()=>{
        expect(GetTimeCached()).toEqual({})
        const date =  new Date().getTime();
        const typeItem = 'cartTime'
        saveTime({typeItem})
        
        const getLocalDate = JSON.parse(localStorage.getItem('times'))

        expect(getLocalDate).toHaveProperty(typeItem)
        expect(getLocalDate[typeItem]).toEqual(date)

        expect(GetTimeCached()).toHaveProperty(typeItem)
        expect(GetTimeCached()[typeItem]).toEqual(date)
    })
})


describe("saveProducts and getProducts",()=>{
    beforeEach(()=>{

        localStorage.clear()
    })
    it("When inserting a new page with items into localStorage, it should save correctly.",()=>{
        const products = ["camisa","shirt","tenis"]
   
        saveProducts({products,page:1})
        const getProducts1 = getProducts()
        expect( getProducts1.get('page-1') ).toEqual(products)
        expect( getProducts1.size ).toEqual( 1 )
      
    })
    it("When a page already exists in localStorage and a new page is inserted, it should save correctly and retain the existing page.",()=>{
        const products = ["camisa","shirt","tenis"]
        const products1 = ["lorem","iptsu","1"]
        saveProducts({products,page:1})

   
        const getProducts1 = getProducts()

        expect( getProducts1.get('page-1') ).toEqual(products)
        expect( getProducts1.size ).toEqual( 1 )
        saveProducts({products:products1,page:2})

        const getProducts2 = getProducts()
        expect( getProducts2.size).toEqual(2)
        expect( getProducts2 .get('page-1')).toEqual(products)
        expect( getProducts2.get('page-2')).toEqual( products1 )
    })
    it("When inserting a new page that already exists, it should update the items on that page.",()=>{
        const products = ["camisa","shirt","tenis"]
        const products1 = ["lorem","iptsu","1"]

        saveProducts({products,page:1})
        const getProducts1 = getProducts()
        expect( getProducts1.get('page-1') ).toEqual(products)
        expect( getProducts1.size ).toEqual( 1 )

        saveProducts({products:products1,page:1})
        
        const getProducts2 = getProducts()

        expect( getProducts2.size).toEqual( 1 )
        expect( getProducts2.get('page-1')).toEqual(products1)
    })
})