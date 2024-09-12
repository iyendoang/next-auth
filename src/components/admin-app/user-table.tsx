// components/UserTable.tsx

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "@/types/user";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
  
  interface UserTableProps {
    data: User[];
  }
  
  export const UserTable = ({ data }: UserTableProps) => {
    // Define the table columns
    const columns = useMemo<ColumnDef<User>[]>(
      () => [
        {
          accessorKey: "name",
          header: () => "Name",
          cell: (info) => info.getValue(),
        },
        {
          accessorKey: "email",
          header: () => "Email",
          cell: (info) => info.getValue(),
        },
        {
          accessorKey: "role",
          header: () => "Role",
          cell: (info) => info.getValue(),
        },
        {
          accessorKey: "status",
          header: () => "Status",
          cell: (info) => (
            <span
              className={`px-2 py-1 rounded-full text-white ${
                info.getValue() === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {info.getValue() === "active" ? "Active" : "Inactive"}
            </span>
          ),
        },
      ],
      []
    );
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };
  