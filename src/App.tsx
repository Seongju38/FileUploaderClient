import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Upload,
  Row,
  Col,
  DatePicker,
  Input,
} from "antd";
import {
  MenuOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import "./App.css";
import FileUploaderTable from "./components/FileUploaderTable";
import UploadManagementTable from "./components/UploadManagementTable";
import FileUploadedTable from "./components/FileUploadedTable";
import { FileData } from "./types";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(false);
  const [fileList, setFileList] = useState<FileData[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const toggleSider = () => {
    setIsSiderCollapsed(!isSiderCollapsed);
  };

  const handleFileChange = (info: { fileList: UploadFile[] }) => {
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
    const updatedFileList = fileList.filter(
      (file) => !selectedKeys.includes(file.key)
    );
    setFileList(updatedFileList);
    setSelectedKeys([]);
  };

  return (
    <Layout
      style={{ minWidth: "200vh", minHeight: "100vh", flexDirection: "column" }}
    >
      <Header
        className="bg-white shadow-sm p-4 text-lg font-semibold"
        style={{ display: "flex", alignItems: "center" }}
      >
        <MenuOutlined className="pr-2" onClick={toggleSider} />
        INFINITT Pathology Consultation Portal
      </Header>

      <Layout style={{ flex: 1, overflow: "hidden" }}>
        <Sider width={200} collapsed={isSiderCollapsed} className="bg-gray-50">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              { key: "1", label: "Upload" },
              { key: "2", label: "History" },
              { key: "3", label: "File Management" },
            ]}
          />
        </Sider>

        <Content className="p-6 flex">
          <Row gutter={24}>
            <Col span={8}>
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
                    showUploadList={false}
                    onChange={handleFileChange}
                    multiple={true}
                  >
                    <Button icon={<PlusOutlined />}>Add</Button>
                  </Upload>
                  <div>
                    <Button className="mr-2 bg-blue-500 text-white">
                      Upload
                    </Button>
                    <Button className="bg-blue-500 text-white">
                      Upload & Register
                    </Button>
                  </div>
                </div>
              </div>
            </Col>

            <Col span={16} className="flex flex-col">
              <Row gutter={[0, 24]}>
                <Col span={24}>
                  <h2>Upload Management</h2>
                  <UploadManagementTable />
                </Col>

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
                  <Button className="bg-blue-500 text-white">
                    Anonymization
                  </Button>
                </div>

                <Col span={24} className="flex-1">
                  <FileUploadedTable />
                </Col>

                <div className="flex justify-end w-full">
                  <Button
                    className="mr-2"
                    type="default"
                    icon={<DeleteOutlined />}
                    danger
                  >
                    Delete
                  </Button>
                  <Button className="bg-blue-500 text-white">Register</Button>
                </div>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
