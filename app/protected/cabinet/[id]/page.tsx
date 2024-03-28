import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { get } from "http";
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

export default async function CabinetEdit({ params}: { params : { id: string },}) {
    const supabase = createClient();
    const { id } = params;

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    // const { data: cabinet, error } = await supabase.from("cabinet").select("*").eq("id", id);   
    const {cabinet} = await getServerSideProps({params});
    
  

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

      <div >
      <h1 className="text-3xl font-bold text-center mb-6">{cabinet[0].name} Cabinet</h1>
        <p className='text-3xl font-bold text-center mb-4'>
          {cabinet[0].description}
        </p>
    </div>
        </>
    )
}
