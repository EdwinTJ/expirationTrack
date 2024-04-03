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

    const { data: cabinet, err } = await supabase
    .from('cabinet')
    .select('*');  
    if (err) {
        console.error(err);
        return <div>Something went wrong while gettin cabinets</div>;
    }


    const getCabinetNameById = (cabinetId: number) => {
        const cabinetById = cabinet.find((cabinet) => cabinet.id === cabinetId);
        console.log("cabinetById", cabinetById);
        return cabinetById ? cabinetById.name : "";
    };
  
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
        <div>
        <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Expiration Date</th>
                    <th className="border border-gray-300 px-4 py-2">QTY</th>
                    <th className="border border-gray-300 px-4 py-2">Cabinet</th>
                  </tr>
                </thead>
                <tbody>
                  {item.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.expiration_date}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2">{getCabinetNameById(item.cabinet_id)}</td>
                    </tr>
                  
                  ))}
                </tbody>
              </table>
        </div>
      <div>
      
    </div>
        </>
    )
}
