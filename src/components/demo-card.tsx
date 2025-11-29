import React from "react";

function DemoCard({ data }: { data: string }) {
  return (
    <div
      data-source="@/components/demo-card.tsx"
      className="border border-neutral-500 rounded-xl shadow-xs max-w-sm p-6"
    >
      {data}
    </div>
  );
}

export default DemoCard;
