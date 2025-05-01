import { ActionIcon, Text } from 'rizzui';
import SimpleBar from '@core/ui/simplebar';
import { useRef, useState } from 'react';
import Upload from '@core/ui/upload';
import Image from 'next/image';
import {
    PiFile,
    PiFileCsv,
    PiFileDoc,
    PiFilePdf,
    PiFileXls,
    PiFileZip,
    PiTrashBold,
  } from "react-icons/pi";


type AcceptedFiles = 'img' | 'pdf' | 'csv' | 'imgAndPdf' | 'all';

export const fileType = {
    "image/jpeg": <PiFile className="h-5 w-5" />,
    "image/png": <PiFile className="h-5 w-5" />,
    "image/gif": <PiFile className="h-5 w-5" />,
    "application/octet-stream": <PiFile className="h-5 w-5" />,
    "text/csv": <PiFileCsv className="h-5 w-5" />,
    "text/plain": <PiFile className="h-5 w-5" />,
    "application/pdf": <PiFilePdf className="h-5 w-5" />,
    "application/xml": <PiFileXls className="h-5 w-5" />,
    "application/zip": <PiFileZip className="h-5 w-5" />,
    "application/gzip": <PiFileZip className="h-5 w-5" />,
    "application/msword": <PiFileDoc className="h-5 w-5" />,
  } as { [key: string]: React.ReactElement };


export const FileInput = ({
  label,
  multiple = true,
  accept = 'img',
  className,
  iconClassName,
  wrapperClassName,
  containerClassName,
  placeholderText,
  onFilesSelected,
}: {
  className?: string;
  iconClassName?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  label?: React.ReactNode;
  multiple?: boolean;
  accept?: AcceptedFiles;
  placeholderText?: React.ReactNode;
  onFilesSelected?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1]) return file[1];
      })
      .filter((file) => file !== undefined);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // If a callback is provided, pass the updated files list to it
    if (onFilesSelected) {
      onFilesSelected([...files, ...newFiles]);
    }
  }

  function handleImageDelete(index: number) {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    (imageRef.current as HTMLInputElement).value = '';

    // Pass updated files to callback if provided
    if (onFilesSelected) {
      onFilesSelected(updatedFiles);
    }
  }

  return (
    <div className={className}>
      <Upload
        wrapperClassName={wrapperClassName}
        iconClassName={iconClassName}
        placeholderText={placeholderText}
        label={label}
        ref={imageRef}
        accept={accept}
        multiple={multiple}
        onChange={(event) => handleFileDrop(event)}
        className={`mb-6 min-h-[280px] justify-center border-dashed bg-gray-50 dark:bg-transparent ${containerClassName}`}
      />

      {files.length > 1 ? (
        <Text className="mb-2 text-gray-500">{files.length} files</Text>
      ) : null}

      {files.length > 0 && (
        <SimpleBar className="max-h-[280px]">
          <div className="grid grid-cols-1 gap-4">
            {files?.map((file: File, index: number) => (
              <div
                className="flex min-h-[58px] w-full items-center rounded-xl border border-muted px-3 dark:border-gray-300"
                key={file.name}
              >
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-muted bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
                  {file.type.includes('image') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      fill
                      className="object-contain"
                      priority
                      alt={file.name}
                      sizes="(max-width: 768px) 100vw"
                    />
                  ) : (
                    <>{fileType[file.type]}</>
                  )}
                </div>
                <div className="truncate px-2.5">{file.name}</div>
                <ActionIcon
                  onClick={() => handleImageDelete(index)}
                  size="sm"
                  variant="flat"
                  color="danger"
                  className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20"
                >
                  <PiTrashBold className="w-6" />
                </ActionIcon>
              </div>
            ))}
          </div>
        </SimpleBar>
      )}
    </div>
  );
};
