import React from 'react';

interface PaginationPreviousProps {
  onClick: () => void;
  disabled: boolean;
}

const PaginationPrevious: React.FC<PaginationPreviousProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="pagination-previous">
      Previous
    </button>
  );
};

export default PaginationPrevious;