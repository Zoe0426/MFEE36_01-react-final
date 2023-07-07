import SignVavbar from './SignNavbar';

export default function SignLayout(children) {
  return (
    <>
      <div className="container-outer">
        <SignVavbar />
        <main className="main">{children}</main>
      </div>
    </>
  );
}
