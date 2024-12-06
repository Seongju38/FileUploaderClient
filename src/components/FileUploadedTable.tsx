import { Progress, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { FileData } from "../types";

interface FileUploadedTableProps {
  fileList: FileData[];
  selectedKeys: React.Key[];
  onSelectChange: (selectedKeys: React.Key[]) => void;
}

const FileUploadedTable = ({
  fileList,
  selectedKeys,
  onSelectChange,
}: FileUploadedTableProps) => {
  const [tableHeight, setTableHeight] = useState<number>(0);
  const [needsScroll, setNeedsScroll] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const columns = [
    { title: "File Name", dataIndex: "fileName", key: "fileName" },
    { title: "Type", dataIndex: "fileType", key: "fileType" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "User Name", dataIndex: "userName", key: "userName" },
    { title: "Upload Date", dataIndex: "uploadDate", key: "uploadDate" },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number) => (
        <Progress percent={progress} size="small" status="active" />
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedKeys,
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
  }, [fileList, tableHeight]);

  return (
    <div style={{ height: "calc(100vh - 460px)", backgroundColor: "#fff" }}>
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

export default FileUploadedTable;
