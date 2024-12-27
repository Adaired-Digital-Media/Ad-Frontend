import { auth } from '@/auth';
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) return null;
  // console.dir(session, {
  //   depth: null,
  // })

  console.log(session);

  return (
    <h1>
      Hello
      <strong> {session?.user.name}</strong>
    </h1>
    // <div>
    //   <h1>
    //     <strong>1.Name = </strong>
    //     {session?.user.name}
    //   </h1>
    //   <h2>
    //     <strong>2.Email = </strong>
    //     {session?.user.email}
    //   </h2>
    //   <h3>
    //     <strong>3.userId = </strong>
    //     {session?.user._id}
    //   </h3>
    //   <h4>
    //     <strong>4.userName = </strong>
    //     {session?.user.userName}
    //   </h4>
    //   <h5>
    //     <strong>5.contact = </strong>
    //     {session?.user.contact}
    //   </h5>
    //   <h6>
    //     <strong>6.isAdmin = </strong>
    //     {session?.user.isAdmin ? 'true' : 'false'}
    //   </h6>
    //   <p>
    //     <strong>7.userStatus = </strong>
    //     {session?.user.userStatus ? 'true' : 'false'}
    //   </p>
    //   <p>
    //     <strong>8.role = </strong>
    //     {session?.user.role ? 'Admin' : ''}
    //   </p>
    //   <p>
    //     <strong>9.cartId = </strong>
    //     {session?.user?.cart?._id}
    //   </p>
    //   <p>
    //     <strong>10.accessToken = </strong>
    //     {session?.user.accessToken}
    //   </p>
    //   <p>
    //     <strong>11.expires = </strong>
    //     {new Date(session?.expires).toLocaleDateString()}
    //   </p>
    // </div>
  );
}
