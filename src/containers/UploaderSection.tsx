import { Button, Upload, UploadFile } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import FileUploaderTable from "../components/FileUploaderTable";
import { useState } from "react";
import { FileData } from "../types";

const UploaderSection: React.FC = () => {
  const [fileList, setFileList] = useState<FileData[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);

  const handleFileChange = (info: { fileList: UploadFile[] }) => {
    setUploadFileList(info.fileList);
    const newFileList = info.fileList.map((file) => {
      const fileSize = file.size
        ? `${(file.size / 1024).toFixed(2)} KB`
        : "Unknown size";
      return {
        key: file.uid,
        name: file.name,
        size: fileSize,
        progress: 100,
      };
    });
    setFileList(newFileList);
  };

  const handleDelete = () => {
    setFileList(fileList.filter((file) => !selectedKeys.includes(file.key)));
    setUploadFileList(
      uploadFileList.filter((file) => !selectedKeys.includes(file.uid))
    );
    setSelectedKeys([]);
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <Button className="mr-2" type="default" icon={<EditOutlined />}>
          Edit
        </Button>
        <Button className="mr-2" type="default">
          Save
        </Button>
        <Button
          className="mr-2"
          onClick={handleDelete}
          type="default"
          icon={<DeleteOutlined />}
          danger
        >
          Delete
        </Button>
      </div>
      <FileUploaderTable
        fileList={fileList}
        selectedKeys={selectedKeys}
        onSelectChange={setSelectedKeys}
      />
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <Upload
            fileList={uploadFileList}
            showUploadList={false}
            onChange={handleFileChange}
            multiple={true}
          >
            <Button icon={<PlusOutlined />}>Add</Button>
          </Upload>
          <div>
            <Button className="mr-2 bg-blue-500 text-white">Upload</Button>
            <Button className="bg-blue-500 text-white">
              Upload & Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploaderSection;
