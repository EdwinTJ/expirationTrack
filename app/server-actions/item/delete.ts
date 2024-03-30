'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function ItemDelete(formData : FormData){
    const supabase = createClient();
  
    const id = parseInt(formData.get('id') as string)

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
      }
  
    const {error} = await supabase
        .from('item')
        .delete()
        .eq('id', id);

    if (error){
        console.error('Error deleting data', error)
        return;
    }

    return  redirect('/protected/item');
}