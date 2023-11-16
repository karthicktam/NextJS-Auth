"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientMember = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="py-5">Member Client Session Details</h1>
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

export default ClientMember;
