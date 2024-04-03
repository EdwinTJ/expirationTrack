import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
async function getServerSideProps({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: cabinet, error } = await supabase
    .from("cabinet")
    .select("*")
    .eq("id", params.id);

  if (error) {
    console.error(error);
  }

  return {
      cabinet,
  };
}

export default async function Cabinet({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    const {cabinet} = await getServerSideProps({params});
    
  if(!cabinet) {
    return <div>loading...</div>
  }
  const { data: item, error } = await supabase
    .from("item")
    .select("*")
    .eq("cabinet_id", params.id);

  if (error) {
    console.error(error);
  }
  const getCabinetNameById = (cabinetId: number) => {
    const cabinetById = cabinet.find((cabinet) => cabinet.id === cabinetId);
    return cabinetById ? cabinetById.name : "";
};
    return(
        <>

<div className="flex-1 w-full flex flex-col gap-20 items-center">   
          <div>
              <h1 className="text-3xl font-bold text-center mb-6">{cabinet[0].name} Cabinet</h1>
              <p className='text-2xl font-bold text-center text-orange-300'>
                {cabinet[0].description}
              </p>
          </div>
          <div>
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
                          <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2">View</button>
                          <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded mr-2">Edit</button>
                          <button className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          </div>
    </div>
        </>
    )
}
