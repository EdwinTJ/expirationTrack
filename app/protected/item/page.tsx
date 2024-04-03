import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ItemHome() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    const { data: cabinet, error } = await supabase
    .from('cabinet')
    .select('*')
    .eq('user_id', user.id);
  
    if (error) {
        console.error(error);
        return <div>Something went wrong while gettin cabinets</div>;
    }

    const {data:item,error : err} = await supabase
    .from('item')
    .select('*');
    
      if(err){
        console.error(err);
        return <div>Something went wrong while getting items</div>;
        
      }
      
    const getCabinetNameById = (cabinetId: number) => {
        const cabinetById = cabinet.find((cabinet) => cabinet.id === cabinetId);
        return cabinetById ? cabinetById.name : "";
    };
  
    return (
    <>
    <div className="flex-1 w-full flex flex-col gap-20 items-center">   
      <div>
        <p>This page help ypu organize and view all your items</p>
        <div>
            <h3>Soon to be expired</h3>
            <Link href="/protected/item/create" className="bg-blue-500 text-white px-2 py-1 rounded mb-2">Create Item</Link>
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Expiration Date</th>
                    <th className="border border-gray-300 px-4 py-2">QTY</th>
                    <th className="border border-gray-300 px-4 py-2">Cabinet</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {item.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.expiration_date}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2">{getCabinetNameById(item.cabinet_id)}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <Link href={`/protected/item/${item.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2">View</Link>
                        <Link href={`/protected/item/edit/${item.id}`} className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2">Edit</Link>
                        <Link href={`/protected/item/delete/${item.id}`} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Delete</Link>
                      </td>
                    </tr>
                  
                  ))}
                </tbody>
              </table>
            </div>
      </div>
    </div>
    </>);

}
