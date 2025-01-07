import React, { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext  } from "react-icons/gr";
import usePagination from "../hooks/usePagination";

interface Province {
  id: number;
  name_th: string;
  name_en: string;
}

const PaginatedProvinces: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const { currentPageItems, currentPage, totalPages, nextPage, previousPage } = usePagination(provinces, { itemsPerPage: 10 });

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await fetch("/complete_provinces_regions.json");
      const data = await response.json();
      setProvinces(data.map((item: any) => ({ id: item.id, name_th: item.name_th, name_en: item.name_en })));
    };

    fetchProvinces();
  }, []);

  return (
    <div className="relative">
      <h1 className="text-xl font-bold text-center mb-4 dark:text-white">Hook Pagination</h1>
      <ul>
        {currentPageItems.map((province) => (
          <li className="py-2 dark:text-white" key={province.id}>
            {province.index}. {province.name_th} ({province.name_en})
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center mt-4 space-x-4">
        <button
          className="p-1 bg-blue-500 text-white rounded-full disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={previousPage}
        >
          <GrFormPrevious />
        </button>
        <span className="dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-1 bg-blue-500 text-white rounded-full disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default PaginatedProvinces;
