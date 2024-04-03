import { createClient } from "@/utils/supabase/server";
import ProtectedPage from "@/app/protected/page";
export default async function Index() {
 const supabase = createClient();


  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
            {user ? <ProtectedPage/> : "Sigin in to see your cabinets"}
      </div>
    </div>
  );
}
