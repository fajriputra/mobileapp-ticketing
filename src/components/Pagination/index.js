import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {usePagination, DOTS} from '../../hooks/usePagination';

export default function Pagination(props) {
  const {
    totalItems,
    siblingCount = 1,
    currentPage,
    onPageChange,
    perPage,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
    perPage,
  });

  if (currentPage === 0 || paginationRange < 2) {
    return null;
  }

  return (
    <View style={styles.container}>
      {paginationRange?.map((item, index) => {
        if (item === DOTS) {
          return (
            <TouchableOpacity activeOpacity={1} style={styles.pageItem}>
              <Text style={styles.pageLink}>&#8230;</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.pageItem,
              item === currentPage && styles.pageItemActive,
            ]}
            onPress={() => onPageChange(item)}
            key={index}>
            <Text
              style={[
                styles.pageLink,
                item === currentPage && styles.pageLinkActive,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  disabled: {
    backgroundColor: '#DEDEDE',
  },
  pageItem: {
    borderRadius: 8,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  pageItemActive: {
    backgroundColor: '#5F2EEA',
  },
  pageLinkActive: {
    color: '#ffffff',
  },
  pageLink: {
    fontSize: 16,
    color: '#4E4B66',
    fontWeight: '400',
  },
});
