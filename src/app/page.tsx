import { Metadata } from "next";
import { appData } from "@/lib/data";
import DemoCard from "@/components/demo-card";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="text-center p-10">
      <h1 className="text-2xl font-semibold">{appData.name}</h1>
      <DemoCard data="Testing" />
    </main>
  );
}
