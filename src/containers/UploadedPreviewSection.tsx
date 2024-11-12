import { Col } from "antd";
import UploadedPreviewTable from "../components/UploadedPreviewTable";

const UploadedPreviewSection: React.FC = () => {
  return (
    <Col span={24}>
      <h2>Upload Management</h2>
      <UploadedPreviewTable />
    </Col>
  );
};

export default UploadedPreviewSection;
