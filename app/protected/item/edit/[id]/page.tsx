import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ItemEditForm } from "@/app/components/item/edit";
export default async function ItemEditPage({ params}: { params : { id: string },}) {
    const supabase = createClient();
    const { id } = params;

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    const { data: item, error } = await supabase.from("item").select("*").eq("id", id);   
        
    if (error) {
        console.error(error);
    }

    const { data: cabinet, error: err } = await supabase
    .from('cabinet')
    .select('*');  
    if (err) {
        console.error(err);
        return <div>Something went wrong while getting cabinets</div>;
    }

    <ItemEditForm item={item || []} cabinet={cabinet || []}/>
}
