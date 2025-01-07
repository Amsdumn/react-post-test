import { useState } from "react";

interface PaginationConfig {
  itemsPerPage?: number;
}

interface PaginationResult<T> {
  currentPageItems: T[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const usePagination = <T>(data: T[], config: PaginationConfig = { itemsPerPage: 10 }): PaginationResult<T> => {
  const { itemsPerPage = 10 } = config;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentPageItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return {
    currentPageItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
  };
};

export default usePagination;
