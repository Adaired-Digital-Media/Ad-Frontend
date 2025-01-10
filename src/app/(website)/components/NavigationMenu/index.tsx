"use client";
import { cn } from "@core/utils/class-names";
import Link from "next/link";
import React from "react";
import { Icons } from "@web-components/Icons";

interface IchildService {
  childServiceName: string;
  childServiceSlug: string;
  childServiceId: string;
  _id: string;
}

type InnerNavigationProps = {
  colorScheme: string;
  serviceName: string;
  childServices: IchildService[];
};

const NavigationMenu: React.FC<InnerNavigationProps> = ({
  colorScheme,
  serviceName,
  childServices,
}) => {
  return (
    <div className={cn(`bg-[#F8F8F8] px-5 pb-5 pt-10 rounded-lg`)}>
      <h3 className={cn(`text-[26px] font-bold font-nunito leading-snug`)} style={{
        color: colorScheme
      }}>{serviceName}</h3>
      <ul>
        {childServices.map((childService) => {
          return (
            <Link href={childService.childServiceSlug || ""} key={childService._id}>
              <li
                className={cn(
                  `flex text-base md:text-[18px] font-semibold font-nunito bg-white p-3 mt-2 hover:text-white group overflow-hidden transition duration-500 menu__item `
                )}
              >
                <style jsx>{`
                  .menu__item {
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                  }
                  .menu__item::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background-color: ${colorScheme};
                    z-index: -1;
                    transition: left 0.5s ease;
                  }

                  .menu__item:hover::before {
                    left: 0;
                  }
                `}</style>
                <Icons.PinkArrowMarker className="inline-block -translate-x-80 text-white group-hover:translate-x-0 transition duration-500" />
                <span className="block">
                  {childService.childServiceName}
                  </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default NavigationMenu;
