export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-start gap-4 w-10/12 pt-8 max-w-7xl">
        <h1 className="text-3xl font-bold">ニュースアグリゲーター</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
