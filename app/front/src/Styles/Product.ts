import styled from "styled-components";

export const ProductStyle = styled.div`
  .product {
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    padding: 24px;
    margin-bottom: 32px;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    }
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.125rem;
    font-weight: 600;
    color: #f5a623; /* Cor de estrela dourada */
    margin-top: 12px;
  }

  .comments {
    margin-top: 24px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  .comments h3 {
    margin-bottom: 12px;
    font-size: 1.1rem;
    color: #333;
  }

  .comment-item {
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
  }

  .comment-item:last-child {
    border-bottom: none;
  }

  .comment-content {
    font-size: 0.95rem;
    color: #444;
    margin-bottom: 4px;
  }

  .comment-author {
    font-size: 0.875rem;
    color: #888;
    font-style: italic;
  }
`;
