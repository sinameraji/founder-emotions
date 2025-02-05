import React from 'react';

interface PaginationNextProps {
  onClick: () => void;
  disabled: boolean;
}

const PaginationNext: React.FC<PaginationNextProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="pagination-next">
      Next
    </button>
  );
};

export default PaginationNext;