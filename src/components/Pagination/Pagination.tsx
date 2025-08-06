import './Pagination.scss'

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = []

  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, start + 4)

  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <ul className='pagination justify-content-center custom-pagination'>
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className='page-link' onClick={() => onPageChange(1)}>«</button>
      </li>
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className='page-link' onClick={() => onPageChange(currentPage - 1)}>‹</button>
      </li>

      {pages.map((page) => (
        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
          <button className='page-link' onClick={() => onPageChange(page)}>{page}</button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className='page-link' onClick={() => onPageChange(currentPage + 1)}>›</button>
      </li>
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className='page-link' onClick={() => onPageChange(totalPages)}>»</button>
      </li>
    </ul>
  );
};
