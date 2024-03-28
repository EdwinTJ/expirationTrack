"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"

export default async function CabinetEdit(formData : FormData) {
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
      }
  

    const id = formData.get('id');
    const name = formData.get('name');
    const description = formData.get('description');


        const { data, error } = await supabase
        .from("cabinet")
        .update({name:name,description:description})
        .eq("id", id);
    
        if (error) {
            console.error(error);
            return ({message : "Something went wrong"});
        }

    return redirect('/protected/cabinet');
}
