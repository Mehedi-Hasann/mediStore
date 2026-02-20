"use client"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { OrdersResponse, OrderStatus } from "@/types/routes.type"
import { updateOrderStatusBySeller } from "@/actions/medicine.actions"
import { toast } from "sonner"

export function OrderCard({ items }: { items: OrdersResponse }) {
  // track selected status per order
  const [selectedStatus, setSelectedStatus] = useState<Record<string, OrderStatus>>({})
  // track updating state per order
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})

  const handleSubmit = async (id: string) => {
    const status = selectedStatus[id];
    if (!status) return

    const toastId = toast.loading("Updating Status...");
    setIsUpdating((prev) => ({ ...prev, [id]: true }))

    try {
      await updateOrderStatusBySeller({ id, status })
      toast.success("Status Updated Successfully", { id: toastId })

      // update successful: remove from selectedStatus so button disabled
      setSelectedStatus((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
    } catch (error) {
      toast.error("Status Update Failed", { id: toastId })
    } finally {
      setIsUpdating((prev) => ({ ...prev, [id]: false }))
    }
  }

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Shipping Address</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.data.map((item) => {
          const currentStatus = item.status as OrderStatus
          const newStatus = selectedStatus[item.id!] ?? currentStatus
          const isChanged = newStatus !== currentStatus

          return (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <select
                  value={newStatus}
                  onChange={(e) =>
                    setSelectedStatus((prev) => ({
                      ...prev,
                      [item.id!]: e.target.value as OrderStatus,
                    }))
                  }
                  className="border bg-black font-bold rounded-md px-2 py-1 text-sm"
                >
                  {Object.values(OrderStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>{item.shippingAddress ?? "N/A"}</TableCell>
              <TableCell>{item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}</TableCell>
              <TableCell className="text-right">${item.totalAmount}</TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => handleSubmit(item.id!)}
                  size="sm"
                  disabled={!isChanged || isUpdating[item.id!] === true}
                >
                  {isUpdating[item.id!] ? "Updating" : "Submit"}
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
