import { Table } from "antd";
import { useEffect, useRef, useState } from "react";

const FileUploadedTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableHeight, setTableHeight] = useState<number>(0);
  const [needsScroll, setNeedsScroll] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const columns = [
    { title: "No.", dataIndex: "num", key: "num" },
    { title: "File Name", dataIndex: "name", key: "name" },
    { title: "Upload Date", dataIndex: "date", key: "date" },
    { title: "Size", dataIndex: "size", key: "size" },
  ];

  const data = [
    { key: "1", num: "1", name: "Data000", date: "20022222", size: "24KB" },
    { key: "2", num: "2", name: "Data0001", date: "20022222", size: "457KB" },
    {
      key: "3",
      num: "3",
      name: "Data0002",
      date: "20022222",
      size: "15,012KB",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      setTableHeight(viewportHeight * 0.35);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const tableContentHeight = tableRef.current.clientHeight;
      setNeedsScroll(tableContentHeight > tableHeight);
    }
  }, [data, tableHeight]);

  return (
    <div style={{ height: "41vh", backgroundColor: "#fff" }}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={needsScroll ? { y: tableHeight } : undefined}
      />
    </div>
  );
};

export default FileUploadedTable;
