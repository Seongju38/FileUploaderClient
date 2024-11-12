import { Button, Col, DatePicker, Input, Row } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import UploadManagementTable from "../components/UploadManagementTable";
import FileUploadedTable from "../components/FileUploadedTable";

const ManagementSection: React.FC = () => {
  return (
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
        <Button className="bg-blue-500 text-white">Anonymization</Button>
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
  );
};

export default ManagementSection;
