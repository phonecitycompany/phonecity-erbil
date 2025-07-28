import React from 'react';
import Button from './Button';
import { useSearchParams } from 'react-router-dom';

export default function ResetFilter({ className }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleReset = () => {
    // console.log('reset');
    searchParams.delete('date');
    searchParams.delete('sortBy');
    searchParams.delete('startDate');
    searchParams.delete('endDate');
    searchParams.delete('belowDateValue');
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Button size="small" className={`${className} `} onClick={handleReset}>
        بەتاڵ کردنەوە
      </Button>
    </div>
  );
}
