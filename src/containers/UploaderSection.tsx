import { Button, Dropdown, Menu, message, Upload, UploadFile } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FileUploaderTable from "../components/FileUploaderTable";
import { useState } from "react";
import { FileData } from "../types";
import { useFileDeleteHandler } from "../hooks/useFileDeleteHandler";
import { RcFile } from "antd/es/upload";

const UploaderSection = () => {
  const [fileList, setFileList] = useState<FileData[]>([]);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  const { selectedKeys, setSelectedKeys, handleDelete } =
    useFileDeleteHandler();

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

  const handleDeleteFiles = () => {
    const { updatedFileList, updatedUploadFileList } = handleDelete(
      fileList,
      uploadFileList
    );

    if (updatedFileList !== undefined) setFileList(updatedFileList);
    if (updatedUploadFileList !== undefined)
      setUploadFileList(updatedUploadFileList);
  };

  const beforeUpload = (file: RcFile) => {
    const validExtensions = [".svs", ".mrxs", ".dat", ".tif"];
    const hasValidExtension = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!hasValidExtension) {
      message.error("The file format is not allowed.");
      return Upload.LIST_IGNORE;
    }
  };

  const handleMenuClick = (e: { key: any }) => {
    switch (e.key) {
      case "import":
        console.log("Option 1 clicked");
        break;
      case "importAndUpload":
        console.log("Option 2 clicked");
        break;
      case "delete":
        console.log("Option 3 clicked");
        break;
      default:
        console.log("Unknown option clicked");
    }
  };

  const moreMenuButton = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="import">Import</Menu.Item>
      <Menu.Item key="importAndUpload">
        <UploadOutlined className="mr-2" />
        Import & Upload
      </Menu.Item>
      <Menu.Item key="delete">
        <DeleteOutlined className="mr-2" />
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="border-t pb-4">
        <div className="flex justify-between items-center">
          <div>
            <Upload
              fileList={uploadFileList}
              showUploadList={false}
              multiple={true}
              onChange={handleFileChange}
              beforeUpload={beforeUpload}
            >
              <Button icon={<PlusOutlined />} className="mr-2">
                Add File
              </Button>
            </Upload>
            <Button
              onClick={handleDeleteFiles}
              type="default"
              icon={<DeleteOutlined />}
              danger
              disabled={selectedKeys.length === 0}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button
              className="mr-2 bg-blue-500 text-white"
              disabled={selectedKeys.length === 0}
            >
              Import
            </Button>
            <Dropdown overlay={moreMenuButton} trigger={["click"]}>
              <MoreOutlined
                style={{
                  fontSize: "20px",
                }}
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <FileUploaderTable
        fileList={fileList}
        selectedKeys={selectedKeys}
        onSelectChange={setSelectedKeys}
      />
      <h3 className="text-right mt-2">
        Total <strong>{fileList.length}</strong>
      </h3>
    </>
  );
};

export default UploaderSection;
