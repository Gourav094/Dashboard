import CardWrapper from "@/components/dashboard/CardWrapper";



export default async function Home() {


  return (
    <div>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardWrapper/>
      </div>
    </div>
  );
}
