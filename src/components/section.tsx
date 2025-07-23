type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="bg-gray-800 rounded-xl shadow-md p-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
