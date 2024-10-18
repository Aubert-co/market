import { mapExpectAll } from "../tests/fixtures"
import { getCart, GetTimeCached, saveCart, saveTime ,cacheChangeQuantity, saveProducts} from "./index"



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


describe.only("products",()=>{
    beforeEach(()=>{
        localStorage.clear()
    })
    it("test",()=>{
        const products = ["camisa","shirt","tenis"]
        saveProducts({products,page:1})

        expect( JSON.parse( localStorage.getItem("products")) ).toEqual([{products,page:1}])

        const newProducts = ["tenis",1,"bermuda"]
        saveProducts({products,page:1})
        const newCache = JSON.parse( localStorage.getItem("products") )

        expect( newCache ).toHaveLength( 1 )
        expect( newCache).toEqual([{products:newProducts,page:1}])
    })
})