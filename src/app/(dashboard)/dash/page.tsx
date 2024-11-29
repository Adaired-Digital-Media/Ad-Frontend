import { auth } from '@/auth';
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) return null;
  console.log(session);

  return (
    <div>
      <h1>1.{session?.user._id}</h1>
      <h2>2.{session?.user.name}</h2>
      <h3>3.{session?.user.userName}</h3>
      <h4>4.{session?.user.email}</h4>
      <h5>5.{session?.user.contact}</h5>
      <h6>6.{session?.user.userStatus ? 'true' : 'false'}</h6>
      <p>{session?.user.image}</p>
    </div>
  );
}
