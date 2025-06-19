import { getMatchCategories } from "../../Helpers";

describe("getMatchCategories",()=>{
    it("test",()=>{
        expect(getMatchCategories('Esportes')).toEqual(["Beleza","Esporte","Roupas"])
    })
})