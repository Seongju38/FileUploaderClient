import { Table } from "antd";

const UploadManagementTable: React.FC = () => {
  const columns = [
    { title: "Information", dataIndex: "information", key: "information" },
    { title: "Label", dataIndex: "label", key: "label" },
    { title: "Macro", dataIndex: "macro", key: "macro" },
  ];

  const data = [
    { key: "1", information: "Data000", label: "photo", macro: "photo" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{ height: 200, backgroundColor: "#fff" }}
    />
  );
};

export default UploadManagementTable;
