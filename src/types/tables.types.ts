import { TableMeta } from '@tanstack/react-table';

export interface CustomTableMeta<T> extends TableMeta<T> {
  handleDeleteRow?: (row: T) => void;
  handleMultipleDelete?: (rows: T[]) => void;
}
