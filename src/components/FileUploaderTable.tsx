import { Progress, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { FileData } from "../types";

interface FileUploaderTableProps {
  fileList: FileData[];
  selectedKeys: React.Key[];
  onSelectChange: (selectedKeys: React.Key[]) => void;
}

const FileUploaderTable = ({
  fileList,
  selectedKeys,
  onSelectChange,
}: FileUploaderTableProps) => {
  const [tableHeight, setTableHeight] = useState<number>(0);
  const [needsScroll, setNeedsScroll] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const columns = [
    { title: "File Name", dataIndex: "fileName", key: "fileName" },
    {
      title: "%",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number) => (
        <Progress percent={progress} size="small" status="active" />
      ),
    },
    { title: "Size", dataIndex: "size", key: "size" },
  ];

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      setTableHeight(viewportHeight * 0.68);
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
  }, [fileList, tableHeight]);

  return (
    <div
      style={{ height: "calc(100vh - 195px)", backgroundColor: "#fff" }}
      ref={tableRef}
    >
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={fileList}
        pagination={false}
        scroll={needsScroll ? { y: tableHeight } : undefined}
      />
    </div>
  );
};

export default FileUploaderTable;
