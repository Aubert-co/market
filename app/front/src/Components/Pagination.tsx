import { useNavigate } from 'react-router-dom';
import type {PageInfo} from '../types/pagination.types'

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage:React.Dispatch<React.SetStateAction<PageInfo>>
  
}

export const Pagination = ({ totalPages, currentPage,setCurrentPage }:Props) => {
    const navigate = useNavigate()
    

    const handlePageChange = (page:number) => {
       setCurrentPage((prev) => ({
            ...prev,
            currentPage: page
        }));

        navigate(`/index/pages?value=${page}`)
    };
 const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          data-testid={`pagination`}
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'active' : ''}
          style={{
            padding: '10px',
            margin: '0 5px',
            cursor: 'pointer',
            backgroundColor: i === currentPage ? '#007bff' : '#f8f9fa',
            color: i === currentPage ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {renderPageNumbers()}
    </div>
  );
};
