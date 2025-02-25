export const paginationPages= (limit: number, total: number): number[] => {
    const totalPages = Math.floor(total / limit) + (total % limit > 0 ? 1 : 0);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };