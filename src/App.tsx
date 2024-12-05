import "./App.css";
import { Layout, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import UploadPage from "./containers/UploadPage";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(false);

  const toggleSider = () => {
    setIsSiderCollapsed(!isSiderCollapsed);
  };

  return (
    <Layout
      style={{ minWidth: "200vh", minHeight: "100vh", flexDirection: "column" }}
    >
      <Header
        className="bg-black shadow-sm p-4 text-lg font-semibold"
        style={{ display: "flex", alignItems: "center", color: "white" }}
      >
        <MenuOutlined className="pr-2" onClick={toggleSider} />
        INFINITT Pathology Consultation Portal
      </Header>
      <Layout>
        <SiderMenu isSiderCollapsed={isSiderCollapsed} />
        <Content>
          <Routes>
            <Route path="/file" element={<UploadPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

interface SiderMenuProps {
  isSiderCollapsed: boolean;
}

const SiderMenu = ({ isSiderCollapsed }: SiderMenuProps) => {
  const navigate = useNavigate();

  return (
    <Sider width={200} collapsed={isSiderCollapsed} className="bg-gray-50">
      <Menu
        mode="inline"
        defaultSelectedKeys={["/file"]}
        onClick={(e) => navigate(e.key)}
        items={[
          {
            key: "/",
            label: "Upload",
            children: [
              { key: "/file", label: "File" },
              { key: "/history", label: "History" },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default App;
