"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { deleteMedicine } from "@/actions/medicine.actions";

interface MedicineUI {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  medicines: MedicineUI[];
}

export function MedicinesTable({ medicines }: Props) {
  const [stockChanges, setStockChanges] = useState<Record<string, number>>({});

  if (!medicines.length) return <p>No medicines found.</p>;

  const handleDelete = async (id : string) => {
    const toastId = toast.loading("Deleting...")
    try {
      await deleteMedicine(id);
      toast.success("Medicine Deletion Success",{id : toastId})
    } catch (error) {
      toast.error("Failed to deleting Medicine", {id : toastId})
    }
  }

  return (
    <div className="overflow-x-auto">
      <Link href={"/seller/medicines/add-medicine"}><Button className="mb-4">Add New Medicine</Button></Link>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price ($)</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {medicines.map((med) => (
            <TableRow key={med.id}>
              <TableCell>{med.name}</TableCell>
              <TableCell>{med.price}</TableCell>

              {/* Stock input */}
              <TableCell className="flex gap-2 items-center">
                    {med.stock}
              </TableCell>

              <TableCell>{med.categoryName}</TableCell>
              <TableCell>
                {new Date(med.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(med.updatedAt).toLocaleDateString()}
              </TableCell>

              {/* Action buttons */}
              <TableCell className="flex gap-2">
                <Link href={`/seller/medicines/${med.id}`}><Button size="sm" variant="outline">Edit</Button></Link>
                <Button onClick={() => handleDelete(med.id)} size="sm" variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
