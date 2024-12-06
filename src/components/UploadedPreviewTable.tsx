import { Table } from "antd";

const UploadPreviewTable = () => {
  const columns = [
    { title: "Information", dataIndex: "information", key: "information" },
    { title: "Label", dataIndex: "label", key: "label" },
    { title: "Macro", dataIndex: "macro", key: "macro" },
  ];

  const data = [
    { key: "1", information: "Data000", label: "photo", macro: "photo" },
  ];

  return (
    <div
      style={{ height: "calc(100vh - 680px)", overflow: "hidden" }}
      className="mb-2"
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ height: 300, backgroundColor: "#fff" }}
      />
    </div>
  );
};

export default UploadPreviewTable;
