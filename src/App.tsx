import { useState } from "react";
import { Layout, Menu, Row, Col } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./App.css";
import UploadSection from "./containers/UploadSection";
import ManagementSection from "./containers/ManagementSection";

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
              <ManagementSection />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
