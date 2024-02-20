const Cache = require('../cache/index')

const datas = [1,2,3,4,5]
const newDatas = {hi:"ola"}
describe("Cache function",()=>{
    jest.useFakeTimers()
    it("Should get a key in cache and return null when nenhuma key é encontrada",()=>{
        const func = Cache.getCache("datas")

        expect(func).toBe(null)
    })
    it("Should create a key in cache with a value equal to an array of data with a duration of 5 seconds",()=>{
        Cache.setCache("name",datas,5000)

        jest.advanceTimersByTime(4000)

        expect(Cache.getCache("name")).not.toBeNull()
        
        jest.advanceTimersByTime(1200)
        expect(Cache.getCache("name")).toBeNull()
    })
    it("should replace a key in cache that already exists",()=>{
        const key = "exists"
        Cache.setCache(key,datas,5000)
        Cache.setCache(key,newDatas,5000)

        expect(Cache.getCache(key)).toEqual(newDatas)
        expect(Cache.getCache(key)).not.toEqual(datas)
    })
    it("Must check for a value that has expired",()=>{
    
        Cache.setCache("name",datas,-1)
        expect(Cache.getCache("name")).toBeNull()
        expect(Cache.getCache("name")).not.toEqual(datas)
    })
    it("Should verify the state of a cache after a long period of time",()=>{
        Cache.setCache("testing",datas,1000000)
    
        expect(Cache.getCache("testing")).toEqual(datas)
        
        jest.advanceTimersByTime(250000)
        
        expect(Cache.getCache("testing")).toEqual(datas)

        jest.advanceTimersByTime(250000)

        expect(Cache.getCache("testing")).toEqual(datas)

        jest.advanceTimersByTime(250000)
        
        expect(Cache.getCache("testing")).toEqual(datas)

        jest.advanceTimersByTime(251000)

        expect(Cache.getCache("testing")).toEqual(null)
    })
})