import { CreateAccount } from "./components/create-account";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <a className="absolute top-4 right-4" href="/login">
        <Button>Sign In</Button>
      </a>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-2xl p-8 rounded-lg md:translate-x-1/2 outline-dashed">
          <CreateAccount />
        </div>
      </div>
    </div>
  );
}
