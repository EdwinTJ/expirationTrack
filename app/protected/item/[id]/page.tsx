import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Item({ params}: { params : { id: string },}) {
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

    const { data: cabinet, error : err } = await supabase
    .from('cabinet')
    .select('*');  
    if (err) {
        console.error(err);
        return <div>Something went wrong while gettin cabinets</div>;
    }


    const getCabinetNameById = (cabinetId: number) => {
        const cabinetById = cabinet.find((cabinet) => cabinet.id === cabinetId);
        return cabinetById ? cabinetById.name : "";
    };
  
    return(
        <>
        <div className="flex-1 w-full flex flex-col gap-20 items-center">   
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
                    {item && item.map((item) => (
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
        </div>
        </>
    )
}
