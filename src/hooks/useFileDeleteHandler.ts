import { useState } from "react";
import { UploadFile } from "antd";
import { FileData } from "../types";

interface useFileDeleteHandlerReturn {
  selectedKeys: React.Key[];
  setSelectedKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  handleDelete: (
    fileList?: FileData[],
    uploadFileList?: UploadFile[]
  ) => { updatedFileList?: FileData[]; updatedUploadFileList?: UploadFile[] };
}

export const useFileDeleteHandler = (): useFileDeleteHandlerReturn => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const handleDelete = (
    fileList?: FileData[],
    uploadFileList?: UploadFile[]
  ) => {
    const updatedFileList = fileList
      ? fileList.filter((file) => !selectedKeys.includes(file.key))
      : undefined;

    const updatedUploadFileList = uploadFileList
      ? uploadFileList.filter((file) => !selectedKeys.includes(file.uid))
      : undefined;

    setSelectedKeys([]);

    return { updatedFileList, updatedUploadFileList };
  };

  return { selectedKeys, setSelectedKeys, handleDelete };
};
