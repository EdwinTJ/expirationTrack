import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4"> Your cabinets</h2>
          <div>
      <table className="w-full border-collapse border border-gray-300">
    <thead className="bg-gray-200">
    <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            {cabinet && cabinet.map((item) => (
                <tr key={item.id}>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <Link href={`/protected/cabinet/${item.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2">View</Link>
                        <Link href={`/protected/cabinet/edit/${item.id}`} className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2">Edit</Link>
                        <Link href={`/protected/cabinet/delete/${item.id}`} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Delete</Link>
                    </td>
                </tr>
            ))}
            </tbody>
       </table>
    {/* Table of Content of Items */}
          </div>
            <div>
            <h3>Soon to be expired</h3>
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
                  {item && item.map((item) => (
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
        </main>
      </div>
    </div>
  );
}
