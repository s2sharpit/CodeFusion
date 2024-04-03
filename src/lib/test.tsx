import prisma from "@/lib/db";

export default async function Test() {
  await prisma.user.create({
    data: {
      username: "test",
      name: "tst",
      id: "157349224",
      email: "test@example.com",
    },
  });
  return (
    <div>
      <h1>Test</h1>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
    </div>
  );
}
