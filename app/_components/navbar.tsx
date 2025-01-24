import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const pages = [
    {
      name: "メニュー 1",
      link: "https://www.kanesuseimen.co.jp/index.php/en/lp/futogirisoba/index",
    },
    {
      name: "メニュー 2",
      link: "https://www.kanesuseimen.co.jp/index.php/en/lp/futogirisoba/index",
    },
    {
      name: "メニュー 3",
      link: "https://www.kanesuseimen.co.jp/index.php/en/lp/futogirisoba/index",
    },
  ];

  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
      className="bg-[#EBE3D2]">
      <div className="flex justify-between gap-10 w-full max-w-screen-xl mx-auto">
        <div className="">
          <Image src="/logo.svg" width={100} height={100} alt="logo" />
        </div>
        <div className="flex gap-[14px] items-center pr-5">
          {pages?.map((item, i) => {
            return (
              <Link href={item.link} key={i} className="text-black text-base">
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
