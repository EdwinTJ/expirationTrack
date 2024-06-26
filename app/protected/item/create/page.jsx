import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import {SubmitButton} from "@/components/SubmitButton";
export default async function ItemCreate() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }

    const {data:cabinet, error} = await supabase
    .from("cabinet")
    .select("*");
    if (error) {
      console.error(error);
      return <div>Something went wrong</div>;
    }

    const create = async (formData) => {
    "use server";
    const name = formData.get("name") ;
    const expiration_date = formData.get("expiration_date") ;
    const quantity = formData.get("quantity") ;
    const cabinet_id = formData.get("cabinet") ;
    const supabase = createClient();

    const { data, error } = await supabase
    .from("item")
    .insert([{name, expiration_date, quantity, cabinet_id}]);

    if (error) {
        console.error(error);
        return <div>Something went wrong</div>;
    }

    return redirect("/protected/item");
    };

    return(
       <>
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
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
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="name"
          required
        />
       <label className="text-md" htmlFor="expiration_date">
       expiration_date
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="expiration_date"
          placeholder="expiration_date"
          required
          type="date" 
          />
        <label htmlFor="quantity">quantity </label>
        <input 
          type="number" 
          id="quantity"
          name="quantity" 
        />
        <label htmlFor="cabinet">
          <select name="cabinet" id="cabinet">
            {cabinet.map((cabinet) => (
              <option key={cabinet.id} value={cabinet.id}>
                {cabinet.name}
              </option>
            ))}
          </select>
        </label>
        <SubmitButton
          formAction={create}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Createing Up..."
        >
          Create
        </SubmitButton>
      </form>
    </div>
</div>
</>
    );
}