import { Row, Col } from "antd";
import UploaderSection from "./UploaderSection";
import UploadedPreviewSection from "./UploadedPreviewSection";
import UploadedSection from "./UploadedSection";

const UploadPage = () => {
  return (
    <div className="p-6 flex">
      <Row gutter={24}>
        <Col span={8}>
          <UploaderSection />
        </Col>
        <Col span={16} className="flex flex-col">
          <Row>
            <UploadedPreviewSection />
            <UploadedSection />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UploadPage;
