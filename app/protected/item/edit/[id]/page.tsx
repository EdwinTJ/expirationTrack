import AuthButton from "@/components/AuthButton";
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


    return(
        <>
            <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>
      <ItemEditForm item={item}/>

      <div>
      
    </div>
        </>
    )
}
