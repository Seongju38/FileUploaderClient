import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { create } from "zustand";
import { useMutation, useQuery } from "react-query";
import Uppy, { UppyFile } from "@uppy/core";
import Dashboard from "@uppy/react/lib/Dashboard";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "./index.css";
import axios from "axios";
import DragDrop from "@uppy/react/lib/DragDrop";
import ProgressBar from "@uppy/react/lib/ProgressBar";

// Zustand 상태관리
interface FileStore {
  uploadedFiles: UppyFile<{}, {}>[];
  addFile: (file: UppyFile<{}, {}>) => void;
  removeFile: (fileID: string) => void;
  resetFiles: () => void;
}

const useFileStore = create<FileStore>((set) => ({
  uploadedFiles: [],
  addFile: (file) =>
    set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] })),
  removeFile: (fileID) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((f) => f.id !== fileID),
    })),
  resetFiles: () => set(() => ({ uploadedFiles: [] })),
}));

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const uploadFileToServer = async (file: UppyFile<{}, {}>) => {
  const mockData = {
    fileName: file.name,
    size: file.size,
  };

  const response = await axios.post(`${API_BASE_URL}/posts`, mockData);
  console.log("Mock response:", response.data);
  return response.data;
};

const App: React.FC = () => {
  const { uploadedFiles, addFile, removeFile, resetFiles } = useFileStore();
  // const [uploadedFiles, setUploadedFiles] = useState<UppyFile<{}, {}>[]>([]); // 파일 목록
  const [isUploading, setIsUploading] = useState(false); // 업로드 진행 상태
  const [uploadProgress, setUploadProgress] = useState<{
    [fileID: string]: number;
  }>({}); // 진행률

  // Uppy 초기화
  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        // maxFileSize: 100 * 1024 * 1024, // 최대 100MB
        // maxNumberOfFiles: 10,
        // allowedFileTypes: [".jpg", ".png", ".pdf", ".zip"],
      },
      autoProceed: false, // 자동 업로드 비활성화
    });
  }, []);

  // React Query Mutation
  const uploadMutation = useMutation(
    async (file: UppyFile<{}, {}>) => await uploadFileToServer(file),
    {
      onSuccess: (data) => {
        console.log("Upload successful:", data);
      },
      onError: (error) => {
        console.error("Upload failed:", error);
      },
    }
  );

  // Uppy 이벤트 바인딩
  useEffect(() => {
    uppy.on("file-added", (file: any) => {
      // setUploadedFiles((prev) => [...prev, file]);
      addFile(file);
    });

    uppy.on("file-removed", (file: any) => {
      // setUploadedFiles((prev) => prev.filter((f) => f.id !== file.id));
      removeFile(file.id);
    });

    uppy.on("upload-progress", (file: any, progress: any) => {
      setUploadProgress((prev) => ({
        ...prev,
        [file.id]: progress.bytesUploaded / progress.bytesTotal,
      }));
    });

    uppy.on("complete", (result: any) => {
      console.log("Upload complete:", result);
      // setUploadedFiles([]); // 업로드 완료 후 파일 목록 초기화
      resetFiles();
    });

    return () => {
      uppy.off("file-added");
      uppy.off("file-removed");
      uppy.off("upload-progress");
      uppy.off("complete");
    };
  }, [uppy]);

  // 파일 업로드 핸들러
  const handleUpload = async () => {
    // setIsUploading(true);
    // try {
    //   await uppy.upload();
    //   console.log("Files uploaded successfully!");
    // } catch (err) {
    //   console.error("Upload failed:", err);
    // } finally {
    //   setIsUploading(false);
    // }
    setIsUploading(true);

    for (const file of uploadedFiles) {
      await uploadMutation.mutateAsync(file); // react-query를 통해 파일 업로드
    }

    setIsUploading(false);
    resetFiles(); // 파일 목록 초기화
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = (fileID: string) => {
    uppy.removeFile(fileID);
  };

  return (
    <div className="p-4 border shadow-md bg-gray-100">
      <h1 className="text-xl font-bold mb-4">File Uploader</h1>

      {/* 전체 레이아웃 */}
      <div className="flex space-x-4">
        {/* 왼쪽 영역 */}
        <div className="w-1/2">
          {/* Drag & Drop Zone */}
          <div
            className="mb-4 w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
          >
            <div className="flex flex-col h-full">
              {/* DragDrop 영역 */}
              <div className="flex-grow flex items-center justify-center">
                <DragDrop uppy={uppy} />
              </div>

              {/* 파일 목록 */}
              <div className="border-t border-gray-300 bg-white overflow-y-auto">
                <ul className="p-2">
                  {uploadedFiles.length === 0 ? (
                    <li className="text-gray-500 text-sm">No files added.</li>
                  ) : (
                    uploadedFiles.map((file) => (
                      <li
                        key={file.id}
                        className="flex justify-between items-center p-2 border-b"
                      >
                        <span>{file.name}</span>
                        <span>
                          {((file.size ?? 0) / (1024 * 1024)).toFixed(2)} MB
                        </span>
                        <button
                          className="ml-4 text-red-500 hover:underline"
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Upload Progress Bar */}
          <div className="mb-4">
            <ProgressBar uppy={uppy} hideAfterFinish={true} />
          </div>

          {/* Upload Button */}
          <button
            className={`px-4 py-2 rounded text-white ${
              isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
        {/* 오른쪽 영역 */}
        {/* Table에 저장이 된 후 목록에 뿌리기 + 이전에 있던 데이터들도 가지고 와야함 */}
        <div className="w-1/2 h-full p-6 bg-white border-l">
          <h2 className="text-2xl font-semibold mb-4">Uploaded Files</h2>
          <div className="overflow-y-auto h-full">
            <table className="table-auto w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    File Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Size</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-500 py-4">
                      No files available.
                    </td>
                  </tr>
                ) : (
                  uploadedFiles.map((file) => (
                    <tr key={file.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {file.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {((file.size ?? 0) / (1024 * 1024)).toFixed(2)} MB
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
