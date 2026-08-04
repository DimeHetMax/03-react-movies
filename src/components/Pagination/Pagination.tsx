import styles from "./Pagination.module.css"

interface PaginationProps {
    pageNumber:number;
    totalPages:number;
    handlePagePagination:(nextPage: number)=>void;
}
const Pagination = ({pageNumber, totalPages, handlePagePagination}:PaginationProps)=>{
    return (
         <nav
                  className={styles.pagination}
                  aria-label="Search results pagination"
                >
                  <button
                    className={styles.paginationButton}
                    type="button"
                    disabled={pageNumber === 1}
                    onClick={() => handlePagePagination(pageNumber - 1)}
                  >
                    Previous
                  </button>

                  <span className={styles.pageInfo} aria-live="polite">
                    Page {pageNumber} of {totalPages}
                  </span>

                  <button
                    className={styles.paginationButton}
                    type="button"
                    disabled={pageNumber === totalPages}
                    onClick={() => handlePagePagination(pageNumber + 1)}
                  >
                    Next
                  </button>
                </nav>
    )
}

export default Pagination;