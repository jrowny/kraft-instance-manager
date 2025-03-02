import { InstanceList } from "./components/InstanceList";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-4xl mx-auto pt-12 pb-8">
        <h1 className="text-3xl font-bold">Instances</h1>
      </header>
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-4xl mx-auto">
        <InstanceList region="was1" />
        <InstanceList region="fra0" />
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-16">
        Kraft Instance Manager
      </footer>
    </div>
  );
}
