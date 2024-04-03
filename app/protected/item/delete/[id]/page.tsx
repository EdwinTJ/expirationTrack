import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ItemDeleteForm } from "@/app/components/item/delete";
export default async function ItemDEletePage({ params}: { params : { id: string },}) {
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


    return(
      <>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <main className="flex-1 flex flex-col gap-6">
            <ItemDeleteForm item={item || []}/>
          </main>
        </div>
      </div>
      </>
    )
}
