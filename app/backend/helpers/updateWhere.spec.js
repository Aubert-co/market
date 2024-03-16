const {updateWhere} =require('./index')



describe("updateWhere",()=>{
    it("when send a object with a value equal a undefined should not return that key",()=>{
        const object = {id:35,name:'lucas',age:undefined}

        expect(updateWhere(object)).toEqual({id:35,name:'lucas'})
        
    })
    it("when send a object with a value equal a undefined should not return that key",()=>{
        const object = {id:35,name:'lucas',age:''}

        expect(updateWhere(object)).toEqual({id:35,name:'lucas'})
    })
    it("when send a object with a value equal a undefined should not return that key",()=>{
        const object = {id:35,name:'lucas'}

        expect(updateWhere(object)).toEqual({id:35,name:'lucas'})
    })
    it("when send a object with a value equal a undefined should not return that key",()=>{
        const object = {id:'',name:'',age:undefined}

        expect(updateWhere(object)).toEqual({})
    })
})