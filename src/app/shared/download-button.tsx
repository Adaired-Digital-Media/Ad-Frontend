"use client";

import {cn} from "@core/utils/class-names";
import { Button, ButtonProps } from "rizzui";
import { PiDownloadSimpleBold } from "react-icons/pi";

export default function DownloadButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn("w-full @lg:w-auto", className)}
      {...props}
    >
      <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
      Download
    </Button>
  );
}
