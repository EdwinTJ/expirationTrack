import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ItemEditForm } from "@/app/components/item/edit";
export default async function ItemEditPage({ params}) {
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

    const { data: cabinet, err } = await supabase
    .from('cabinet')
    .select('*');  
    if (err) {
        console.error(err);
        return <div>Something went wrong while gettin cabinets</div>;
    }


    console.log(cabinet)

    return(
        <>
            <div className="flex-1 w-full flex flex-col gap-20 items-center">

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
        <h2 className="font-bold text-4xl mb-4"> Edit Item</h2>
        <ItemEditForm item={item} cabinet={cabinet}/>

        </main>
        </div>
            </div>
        </>
    )
}
