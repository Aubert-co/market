import { waitFor,renderHook } from "@testing-library/react";
import { fetchData } from "./index";

let   mockSetState 

describe('usefetchData', () => {
  beforeEach(()=>{
    
    mockSetState = jest.fn();
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: (initialState) => [initialState, mockSetState],
}));
  })
  it('should fetch and update data', async () => {
    const body ={product_id:37,name:'lucas'}
    const mockService = jest.fn().mockReturnValue({datas:'value',status:200})
    const {rerender} = renderHook(() =>
      fetchData({service:mockService, body,setItems:mockSetState})
    );
    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledTimes(1)
      expect(mockSetState).toHaveBeenCalledWith({datas:'value',status:200})
      expect(mockService).toHaveBeenCalledTimes(1)
      expect(mockService).toHaveBeenCalledWith({body})
    });
   

  });
  it('When no send body should not pass it to service', async () => {
    const body ={product_id:37,name:'lucas'}
    const mockService = jest.fn().mockReturnValue({datas:'value',status:200})
    const {rerender} = renderHook(() =>
      fetchData({service:mockService,setItems:mockSetState})
    );
    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledTimes(1)
      expect(mockSetState).toHaveBeenCalledWith({datas:'value',status:200})
      expect(mockService).toHaveBeenCalledTimes(1)
      expect(mockService).toHaveBeenCalledWith( undefined )
    });
   

  });
  it('When no send body should not pass it to service', async () => {
    const body ={product_id:37,name:'lucas'}
    const mockService = jest.fn().mockReturnValue({datas:'value',status:500})
    const {rerender} = renderHook(() =>
      fetchData({service:mockService,setItems:mockSetState})
    );
    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledTimes(1)
      expect(mockSetState).toHaveBeenCalledWith({datas:[],status:500})
      expect(mockService).toHaveBeenCalledTimes(1)
      expect(mockService).toHaveBeenCalledWith( undefined )
    });
   

  });
});
