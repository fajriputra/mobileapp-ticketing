import React from 'react';
import {usePagination, DOTS} from '../../hooks/usePagination';

export default function Pagination(props) {
  const {
    totalItems,
    siblingCount = 1,
    currentPage,
    onPageChange,
    perPage,
  } = props;

  return <div />;
}
