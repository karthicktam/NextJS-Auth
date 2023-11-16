import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="py-5">Member Server Session</h1>
      {session?.user?.email && (
        <p className="text-left">Email: {session?.user?.email}</p>
      )}
      {session?.user?.role && (
        <p className="text-left">Role: {session?.user?.role}</p>
      )}
      {session?.user?.name && (
        <p className="text-left">Name: {session?.user?.name}</p>
      )}
    </div>
  );
};

export default Member;
