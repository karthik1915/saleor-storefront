import { Metadata } from "next";
import { appData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="text-center p-6">
      <h1 className="text-2xl font-semibold">{appData.name}</h1>
    </main>
  );
}
