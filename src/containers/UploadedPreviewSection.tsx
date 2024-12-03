import { Col } from "antd";
import UploadedPreviewTable from "../components/UploadedPreviewTable";

const UploadedPreviewSection = () => {
  return (
    <Col span={24}>
      <h2 className="mb-6">Upload Management</h2>
      <UploadedPreviewTable />
    </Col>
  );
};

export default UploadedPreviewSection;
