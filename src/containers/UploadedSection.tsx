import { Button, Col, DatePicker, Input } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import FileUploadedTable from "../components/FileUploadedTable";

const UploadedSection: React.FC = () => {
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
    </>
  );
};

export default UploadedSection;
