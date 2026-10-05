"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const getPageNumbers = (
  totalPages: number,
  page: number,
): ("ellipsis" | number)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

interface Props {
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  page: number;
}

const TablePagination = ({ totalPages, handlePageChange, page }: Props) => {
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              handlePageChange((prev) => (prev === 1 ? 1 : prev - 1))
            }
            className={`${page === 1 && "pointer-events-none opacity-50"}`}
          />
        </PaginationItem>
        {getPageNumbers(totalPages, page).map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index + 1}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                onClick={() => handlePageChange(item)}
                isActive={page === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePageChange((prev) =>
                prev === totalPages ? totalPages : prev + 1,
              )
            }
            className={`${page === totalPages && "pointer-events-none opacity-50"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
