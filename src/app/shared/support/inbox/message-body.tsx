"use client";

import Image from "next/image";
import { useState } from "react";
import { useCopyToClipboard } from "@core/hooks/use-copy-to-clipboard";
import { Avatar, Title, Text, Tooltip, Button } from "rizzui";
import { getRelativeTime } from "@core/utils/get-relative-time";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { PiEye, PiDownloadSimpleBold, PiCheck } from "react-icons/pi";
import imageIcon from "@public/image-icon.svg";
import { TicketMessage } from "@/types/tickets.types";
import { DotSeparator } from "@/app/shared/support/inbox/message-details";
import { FiExternalLink } from "react-icons/fi";
import parse from "html-react-parser";

export default function MessageBody({ message }: { message: TicketMessage }) {
  const [isCopied, setIsCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyToClipboard = () => {
    copyToClipboard(message?._id!.toString());
    if (!isCopied) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="grid grid-cols-[32px_1fr] items-start gap-3 lg:gap-4 xl:grid-cols-[48px_1fr]">
        <Avatar
          name={message?.sender?.name || "user name"}
          src={message.sender.image}
          className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-11 xl:!w-11"
        />
        <div className="-mt-1.5 lg:mt-0">
          <div className="flex items-center justify-between">
            <Title as="h3" className="text-sm font-medium">
              {message.sender.name}
            </Title>
          </div>
          <div className="mt-1.5 items-center gap-2 text-xs text-gray-500 md:flex">
            <span className="flex items-center lowercase">
              {message?.sender?.email}
              <FiExternalLink className="ml-1 h-2.5 w-2.5" />
            </span>
            <DotSeparator className="hidden md:block" />
            <span className="mt-1.5 flex items-center md:mt-0">
              #{message._id!.toString().slice(-6)}
              <Tooltip
                size="sm"
                rounded="sm"
                placement="top"
                content={isCopied ? "Copied" : "Click to copy"}
              >
                <button type="button" onClick={handleCopyToClipboard}>
                  {isCopied ? (
                    <PiCheck className="ml-1 h-3 w-3" />
                  ) : (
                    <HiOutlineClipboardDocument className="ml-1 h-3 w-3" />
                  )}
                </button>
              </Tooltip>
            </span>
            <DotSeparator className="hidden md:block" />
            <span>{getRelativeTime(new Date(message.createdAt))}</span>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-3 grid gap-2 leading-relaxed xl:ml-16 2xl:mt-4">
        <Text>{parse(message.message)}</Text>

        {message.attachments.length > 0 && (
          <div className="mt-2 grid gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.publicId}
                className="grid grid-cols-[40px_1fr] gap-2.5"
              >
                <figure className="relative h-10 w-10 overflow-hidden rounded">
                  {attachment.url ? (
                    <Image
                      fill
                      alt={attachment.fileName}
                      src={attachment.url}
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <Image
                      src={imageIcon}
                      fill
                      alt="imageIcon"
                      className="h-full w-full"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </figure>

                <div className="text-xs">
                  <span className="flex items-center gap-2 font-lexend font-medium text-gray-700">
                    {attachment.fileName}
                    <span className="text-gray-500">
                      ({Math.round(attachment.fileSize / 1024)} KB)
                    </span>
                  </span>
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-500 transition duration-300 hover:text-gray-900"
                    >
                      <PiEye className="h-3.5 w-3.5" /> <span>Preview</span>
                    </a>
                    <DotSeparator />
                    <Button
                      variant="text"
                      onClick={() =>
                        handleDownload(attachment.url, attachment.fileName)
                      }
                      className="text-xs font-normal flex items-center gap-2 text-gray-500 transition duration-300 hover:text-gray-900 p-0 m-0 h-auto"
                    >
                      <PiDownloadSimpleBold className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
