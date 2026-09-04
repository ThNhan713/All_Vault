'use client'

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, AuthRefreshing, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "../components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments)
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <UserButton />
          <ModeToggle />
          <Button onClick={() => { createDocument({ title: "test doc" }) }}>Test create docs</Button>
          {documents?.map((document) => <div key={document._id}>{document.title}</div>)}
        </Authenticated>
        <AuthLoading>
          <p>Still loading</p>
        </AuthLoading>
        <AuthRefreshing>
          <p>Refreshing token...</p>
        </AuthRefreshing>

      </main>
    </div>
  );
}
