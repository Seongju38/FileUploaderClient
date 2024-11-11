// 공통 데이터 타입 정의, API 관련 타입 정의, 전역 설정 타입 정의
/******************************************* 예시 ********************************************/
// // File Data 타입 정의
// export interface FileData {
//   key: string;
//   name: string;
//   size: string;
//   progress: number;
// }

// // API 응답 타입 정의
// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// // 사용자 권한 정의
// export enum UserRole {
//   ADMIN = "admin",
//   USER = "user",
//   GUEST = "guest",
// }

// // 파일 업로드 상태 정의
// export type UploadStatus = "pending" | "in_progress" | "completed" | "failed";
/******************************************************************************************/

export interface FileData {
  key: string;
  name: string;
  size: string;
  progress: number;
}
