import React, { ReactNode } from "react";

// Props for Table
type TableProps = {
  children: ReactNode;
  className?: string;
} & React.TableHTMLAttributes<HTMLTableElement>;

// Props for TableHeader
type TableHeaderProps = {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableSectionElement>;

// Props for TableBody
type TableBodyProps = {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableSectionElement>;

// Props for TableRow
type TableRowProps = {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableRowElement>;

// Props for TableCell
type TableCellProps = {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
} & React.ThHTMLAttributes<HTMLTableCellElement> &
  React.TdHTMLAttributes<HTMLTableCellElement>;

// Table Component
const Table: React.FC<TableProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <table className={`min-w-full ${className}`} {...props}>
      {children}
    </table>
  );
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = "",
  ...props
}) => {
  const CellTag = isHeader ? "th" : "td";

  return (
    <CellTag className={className} {...props}>
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };