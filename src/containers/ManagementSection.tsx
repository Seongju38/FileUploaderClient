import { Col } from "antd";
import UploadManagementTable from "../components/UploadManagementTable";

const ManagementSection: React.FC = () => {
  return (
    <Col span={24}>
      <h2>Upload Management</h2>
      <UploadManagementTable />
    </Col>
  );
};

export default ManagementSection;
