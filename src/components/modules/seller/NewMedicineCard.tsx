"use client"

import { createMedicine, getAllCategory } from "@/actions/medicine.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreateNewMedicine } from "@/types/routes.type";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name : z.string().min(1, "You must Provide Medicine Name"),
  price : z.string().min(1, "Price is required"),
  stock : z.string().min(1, "Stock can not be empty"),
  categoryName : z.string().min(1, "Category con not be empty")
})


export function NewMedicineCard () {

  const form = useForm({
    defaultValues : {
      name : "",
      price : "",
      stock : "",
      categoryName : "",
    },
    validators : {
      onSubmit : formSchema
    }
    ,
    onSubmit : async ({value}) => {
      const toastId = toast.loading("Adding Medicine...");
      const medicineData = {
        name : value.name,
        price : Number(value.price),
        stock : Number(value.stock),
        category : value.categoryName
      };
      try {
        const res = await createMedicine(medicineData);
        toast.success("Medicine Created Successfully",{id : toastId})
        form.reset();
      } catch (error) {
        toast.error("Medicine Creation Failed",{id : toastId})
      }
    }
  })
  const [categories, setCategories] = useState<{categoryName : string}[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategory();
      // console.log("from newMedicine Card ",data);
      if(data?.data){
        setCategories(data.data);
        form.setFieldValue("categoryName", data.data[0].categoryName);
      }
    }
    fetchCategories();
  },[])
  // console.log(categories);
  
  return (
    
    <div className="max-w-2/3 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Medicine</CardTitle>
          <CardDescription>Provide Information to Create a new Medicine</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="add-medicine" onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
            <FieldGroup>
              <form.Field name="name" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel className="text-lg">Medicine Name</FieldLabel>
                    <Input type="text" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                    {isInvalid && (
                                          <FieldError errors={field.state.meta.errors} />
                                    )}
                  </Field>
                )
              }}/>
              <form.Field name="categoryName">
  {(field) => (
    <Field>
      <FieldLabel className="text-lg">Category Name</FieldLabel>
      <select
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full border rounded px-2 py-2"
      >
        {/* <option value="" className="bg-black">Select Category</option> */}
        {categories.map((cat) => (
          <option key={cat.categoryName} value={cat.categoryName} className="bg-black">
            {cat.categoryName}
          </option>
        ))}
      </select>
      
    </Field>
  )}
</form.Field>

              <form.Field name = "price" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel className="text-lg">Price / <span className="text-sm">unit</span></FieldLabel>
                    <Input type="number" id={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}/>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                )}
                  </Field>
                )
              }}/>
              <form.Field name="stock" children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return(
                  <Field>
                    <FieldLabel className="text-lg">Stock</FieldLabel>
                    <Input type="number" id={field.name} value={field.state.value} onChange={(e) => {
                      field.handleChange(e.target.value)
                    }} />
                    {isInvalid && (
                                          <FieldError errors={field.state.meta.errors} />
                                    )}
                  </Field>
                )
              }} />
            </FieldGroup>

          </form>
        </CardContent>
        <CardFooter>
          <Button form="add-medicine" type="submit">Add Medicine</Button>
        </CardFooter>
      </Card>

    </div>
    
  );
}