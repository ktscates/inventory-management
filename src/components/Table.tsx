"use client";
import React, { useState } from "react";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  itemsPerPage?: number;
}

const Table = <T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  itemsPerPage = 5,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Get the current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-gray-800 border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="py-2 px-4 border text-left"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="py-2 px-4 border">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key as string} className="py-2 px-4 border">
                  {String(item[col.key])}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="py-2 px-4 border flex space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-3 items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-600 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-800">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-blue-300 text-gray-600 rounded disabled:border-2 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
