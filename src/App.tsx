import { useState } from "react";
import { Layout, Menu, Button, Row, Col, DatePicker, Input } from "antd";
import {
  MenuOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./App.css";
import UploadManagementTable from "./components/UploadManagementTable";
import FileUploadedTable from "./components/FileUploadedTable";
import UploadSection from "./containers/UploadSection";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(false);

  const toggleSider = () => {
    setIsSiderCollapsed(!isSiderCollapsed);
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
              <UploadSection />
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
