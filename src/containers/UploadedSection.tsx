import { Button, Col, DatePicker, Input } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import FileUploadedTable from "../components/FileUploadedTable";
import { useState } from "react";
import { FileData } from "../types";
import { useFileDeleteHandler } from "../hooks/useFileDeleteHandler";

const UploadedSection: React.FC = () => {
  const TestData = [
    {
      key: "1",
      num: "1",
      name: "Data000",
      date: "20022222",
      size: "24KB",
    },
    {
      key: "2",
      num: "2",
      name: "Data0001",
      date: "20022222",
      size: "457KB",
    },
    {
      key: "3",
      num: "3",
      name: "Data0002",
      date: "20022222",
      size: "15,012KB",
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
      <div className="flex items-center justify-between w-full">
        <div className="flex space-x-2">
          <DatePicker
            className="w-36"
            size="middle"
            placeholder="Upload Date"
          />
          <Input className="w-36" suffix={<SearchOutlined />} />
          <Button icon={<SearchOutlined />} />
        </div>
        <Button className="bg-blue-500 text-white">Anonymization</Button>
      </div>
      <Col span={24} className="flex-1">
        <FileUploadedTable
          fileList={fileList}
          selectedKeys={selectedKeys}
          onSelectChange={setSelectedKeys}
        />
      </Col>
      <div className="flex justify-end w-full">
        <Button
          className="mr-2"
          onClick={handleDeleteFiles}
          type="default"
          icon={<DeleteOutlined />}
          danger
        >
          Delete
        </Button>
        <Button className="bg-blue-500 text-white">Register</Button>
      </div>
    </>
  );
};

export default UploadedSection;
