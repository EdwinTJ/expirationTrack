import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function CabinetHome() {
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
        return <div>Something went wrong</div>;
    }
    return (    
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div>Welcome to your cabinet, {user.email}!</div>
      <div>
        {/* Table Of Cabinets */}
        <Link href="/protected/cabinet/create" className="bg-blue-500 text-white px-2 py-1 rounded mb-4">Create Cabinet</Link>
      <table className="w-full border-collapse border border-gray-300 mt-6">
      <thead className="bg-gray-200">
      <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
          </thead>
          <tbody>
              {cabinet &&cabinet.map((item) => (
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
      </div>
    </div>
    );
}
