import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CabinetDeleteForm } from "@/app/components/cabinet/delete";
export default async function CabinetDeletePage({ params}: { params : { id: string },}) {
    const supabase = createClient();
    const { id } = params;

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    const { data: cabinet, error } = await supabase.from("cabinet").select("*").eq("id", id);   
    
    if (error) {
        console.error(error);
    }


    return (
        <>
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                    <main className="flex-1 flex flex-col gap-6">
                        <h2 className="font-bold text-4xl mb-4"> Delete Item</h2>
                        <CabinetDeleteForm cabinet={cabinet || []} id={id} />
                    </main>
                </div>
            </div>
        </>
    );
}
