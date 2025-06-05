import * as FileUpload from "../../Services/FileUpload"


describe("APi StoreCreate",()=>{
    it("",()=>{
        jest.spyOn(FileUpload,"uploadFileToGCS").mockResolvedValue("")
    })
})