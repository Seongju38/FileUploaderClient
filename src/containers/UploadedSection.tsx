import { Button, Col } from "antd";
import {
  DeleteOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FileUploadedTable from "../components/FileUploadedTable";
import { useState } from "react";
import { FileData } from "../types";
import { useFileDeleteHandler } from "../hooks/useFileDeleteHandler";

const UploadedSection = () => {
  const TestData = [
    {
      key: "1",
      fileName: "Data000",
      fileType: ".ndpi",
      size: "24KB",
      userName: "홍길동",
      uploadDate: "",
      progress: 30,
    },
    {
      key: "2",
      fileName: "Data0001",
      fileType: ".mrxs",
      size: "457KB",
      userName: "이몽룡",
      uploadDate: "",
      progress: 70,
    },
    {
      key: "3",
      fileName: "Data0002",
      fileType: ".bif",
      size: "1023KB",
      userName: "성춘향",
      uploadDate: "20030305 시간도?",
      progress: 100,
    },
  ];

  const [fileList, setFileList] = useState<FileData[]>(TestData);

  const { selectedKeys, setSelectedKeys, handleDelete } =
    useFileDeleteHandler();

  const handleDeleteFiles = () => {
    const { updatedFileList } = handleDelete(fileList);
    if (updatedFileList) {
      setFileList(updatedFileList);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between w-full mb-2">
        <Button
          type="text"
          className="p-0"
          onClick={() => console.log("Remove button clicked")}
        >
          <SyncOutlined />
          Remove from list of completed files
        </Button>
        <Button
          className="bg-blue-500 text-white"
          disabled={selectedKeys.length === 0}
        >
          <UploadOutlined />
          Upload
        </Button>
      </div>
      <Col span={24}>
        <FileUploadedTable
          fileList={fileList}
          selectedKeys={selectedKeys}
          onSelectChange={setSelectedKeys}
        />
      </Col>
      <div className="flex justify-end w-full">
        <h3 className="text-right mt-2">
          Total <strong>{fileList.length}</strong>
        </h3>
      </div>
    </>
  );
};

export default UploadedSection;
