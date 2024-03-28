'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function CabinetDelete(formData : FormData){
    const supabase = createClient();
  
    const id = formData.get('id')

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) {
        return redirect("/login");
      }
  
    const {error} = await supabase
        .from('cabinet')
        .delete()
        .eq('id', id);

    if (error){
        console.error('Error deleting data', error)
        return;
    }

    return  redirect('/protected/cabinet');
}