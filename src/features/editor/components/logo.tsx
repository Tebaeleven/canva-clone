import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className=" size-12 relative shrink-0">
        <Image
          className="shrink-0 hover:opacity-75 transition"
          src="/logo.svg"
          alt="logo"
          fill
        />
      </div>
    </Link>
  );
};
