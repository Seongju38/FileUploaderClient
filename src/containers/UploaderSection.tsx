import { Button, message, Upload, UploadFile } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
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
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files can be uploaded.");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  return (
    <>
      <h3 className="text-right mb-3">
        Total <strong>{fileList.length}</strong>
      </h3>
      <FileUploaderTable
        fileList={fileList}
        selectedKeys={selectedKeys}
        onSelectChange={setSelectedKeys}
      />
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div>
            <Upload
              fileList={uploadFileList}
              showUploadList={false}
              multiple={true}
              onChange={handleFileChange}
              listType="picture"
              beforeUpload={beforeUpload}
            >
              <Button icon={<PlusOutlined />} className="mr-2">
                Add
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
              Upload
            </Button>
            <Button
              className="bg-blue-500 text-white"
              disabled={selectedKeys.length === 0}
            >
              Upload & Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploaderSection;
