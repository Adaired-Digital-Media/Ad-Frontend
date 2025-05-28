/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DateFiled from "@core/components/controlled-table/date-field";
import PriceField from "@core/components/controlled-table/price-field";
import StatusField from "@core/components/controlled-table/status-field";
import { FilterDrawerView } from "@core/components/controlled-table/table-filter";
import {
  renderOptionDisplayValue,
  statusOptions,
} from "@/app/shared/ecommerce/invoice/form-utils";
import { type Table as ReactTableType } from "@tanstack/react-table";
import { useState } from "react";
import {
  PiFunnel,
  PiMagnifyingGlassBold,
  PiTrash,
  PiTrashDuotone,
} from "react-icons/pi";
import { Button, Flex, Input } from "rizzui";
import ToggleColumns from "@core/components/table-utils/toggle-columns";

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({
  table,
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    userId: "",
    finalAmount: ["", ""],
    createdAt: [null, null],
    dueDate: [null, null],
    status: [],
  });
  const isMultipleSelected = table.getSelectedRowModel().rows.length > 1;
  const applyFilters = () => {
    table.getColumn("userId")?.setFilterValue(localFilters.userId);
    table.getColumn("finalAmount")?.setFilterValue(localFilters.finalAmount);
    table.getColumn("createdAt")?.setFilterValue(localFilters.createdAt);
    table.getColumn("dueDate")?.setFilterValue(localFilters.dueDate);
    table.getColumn("status")?.setFilterValue(localFilters.status);
  };

  return (
    <Flex align="center" justify="between" className="mb-4 gap-0">
      <Flex align="center" className="w-auto flex-wrap">
        <Input
          type="search"
          placeholder="Search by customer name..."
          value={table.getState().globalFilter ?? ""}
          onClear={() => table.setGlobalFilter("")}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          inputClassName="h-9"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
        />
      </Flex>
      <FilterDrawerView
        isOpen={openDrawer}
        drawerTitle="Table Filters"
        setOpenDrawer={setOpenDrawer}
        onApplyFilters={applyFilters}
      >
        <div className="grid grid-cols-1 gap-6">
          <FilterElements
            table={table}
            localFilters={localFilters}
            setLocalFilters={setLocalFilters}
          />
        </div>
      </FilterDrawerView>
      <Flex align="center" className="w-auto">
        {isMultipleSelected ? (
          <Button
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
          >
            <PiTrash size={18} />
            Delete
          </Button>
        ) : null}

        <Button
          variant={"outline"}
          onClick={() => setOpenDrawer(!openDrawer)}
          className="h-9 pe-3 ps-2.5"
        >
          <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
          Filters
        </Button>

        <ToggleColumns table={table} />
      </Flex>
    </Flex>
  );
}

function FilterElements<T extends Record<string, any>>({
  table,
  localFilters,
  setLocalFilters,
}: TableToolbarProps<T> & {
  localFilters: any;
  setLocalFilters: React.Dispatch<React.SetStateAction<any>>;
}) {
  const isFiltered =
    table.getState().globalFilter || table.getState().columnFilters.length > 0;
  return (
    <>
      <Input
        type="text"
        value={localFilters.userId}
        onChange={(e) =>
          setLocalFilters({ ...localFilters, userId: e.target.value })
        }
        label="Customer"
        placeholder="Customer name"
      />
      <PriceField
        value={localFilters.finalAmount}
        onChange={(v) => setLocalFilters({ ...localFilters, finalAmount: v })}
      />
      <DateFiled
        selectsRange
        dateFormat={"dd-MMM-yyyy"}
        className="w-full"
        placeholderText="Select created date"
        startDate={localFilters.createdAt[0]}
        endDate={localFilters.createdAt[1]}
        onChange={(date) => {
          setLocalFilters({ ...localFilters, createdAt: date });
        }}
        inputProps={{
          label: "Created Date",
        }}
      />

      <DateFiled
        selectsRange
        dateFormat={"dd-MMM-yyyy"}
        className="w-full"
        placeholderText="Select due date"
        startDate={localFilters.dueDate[0]}
        endDate={localFilters.dueDate[1]}
        onChange={(date) => {
          setLocalFilters({ ...localFilters, dueDate: date });
        }}
        inputProps={{
          label: "Due Date",
        }}
      />

      <StatusField
        options={statusOptions}
        value={localFilters.status}
        onChange={(e) => setLocalFilters({ ...localFilters, status: e })}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderOptionDisplayValue(option.value as string)
        }
        displayValue={(selected: string) => renderOptionDisplayValue(selected)}
        dropdownClassName="!z-20 h-auto"
        className={"w-auto"}
        label="Status"
      />

      {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            setLocalFilters({
              userId: "",
              finalAmount: ["", ""],
              createdAt: [null, null],
              dueDate: [null, null],
              status: [],
            });
            table.resetGlobalFilter();
            table.resetColumnFilters();
          }}
          variant="flat"
          className="h-9 bg-gray-200/70"
        >
          <PiTrashDuotone className="me-1.5 size-[17px]" /> Clear
        </Button>
      )}
    </>
  );
}
