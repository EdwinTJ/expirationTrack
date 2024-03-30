"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"

export default async function ItemEdit(formData : FormData) {
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
      }
  

    const id = parseInt(formData.get('id') as string); 
    const name = formData.get('name');
    const expiration_date = formData.get('expiration_date');
    const quantity = parseInt(formData.get('quantity') as string);


        const { data, error } = await supabase
        .from("item")
        .update({name:name,expiration_date:expiration_date,quantity:quantity})
        .eq("id", id);
    
        if (error) {
            console.error(error);
            return ({message : "Something went wrong"});
        }

    return redirect('/protected/item');
}
