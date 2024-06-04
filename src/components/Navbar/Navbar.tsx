"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { userSession } from "@/types";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<userSession>();

  useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage){
      const userData = localStorage.getItem("userSession")
      setUserData(JSON.parse(userData!))
    }
  }, [pathname])


  return ( 
    <nav className="flex flex-col items-center justify-between p-4 bg-gray-200">
      <div className="w-full flex flex-row items-center justify-between">
        <Link href="/">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/15216/15216856.png"
            alt="T-Store Logo"
            width={40}
            height={40}
          />
        </Link>

        <input
          type="text"
          placeholder="Search..."
          className="max-w-[220px] flex-1 mx-4 p-2 rounded-md "
        />

        <div className="items-center gap-4 flex flex-row ">
          <div className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-4 h-0.5 bg-black my-1"></div>
            <div className="w-4 h-0.5 bg-black my-1"></div>
            <div className="w-4 h-0.5 bg-black my-1"></div>
          </div>

          {
            userData?.token ? (
              <div>
                <Link href="/dashboard">
                  <p>{userData?.userData.name}</p>
                </Link>
               
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <p>Sign In</p>
                </Link>
              </div>
            )
          }
          

          <Link href="/cart">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/711/711897.png"
              alt="Cart Logo"
              width={30}
              height={30}
            />
          </Link>
        </div>
      </div>

      <div className={`${
          isMenuOpen ? "translate-y-0" : "-translate-y-[1000%]"
        } transition-transform duration-300 mt-4 flex items-center flex-row gap-4 `}>
        <a>Smartphones</a>

        <a>Tablets</a>

        <a>Laptops</a>
      </div>
    </nav>
  );
};

export default Navbar;
