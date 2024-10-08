const downloadPDF = (base64Data: string) => {
  // Decode base64 data
  const binaryData = atob(base64Data);
  // Create Blob from binary data
  const blob = new Blob([binaryData], { type: "application/pdf" });
  // Create URL for the Blob
  const url = URL.createObjectURL(blob);
  // Create anchor element
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "example.pdf");
  // Append anchor to body
  document.body.appendChild(link);
  // Trigger download
  link.click();
  // Cleanup
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

const downloadFile = (base64Data: string, fileName: string) => {
  // Mapping of file extensions to MIME types
  const mimeTypes: { [key: string]: string } = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    txt: "text/plain",
    html: "text/html",
    csv: "text/csv",
    json: "application/json",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    zip: "application/zip",
    mp4: "video/mp4",
  };

  // Extract file extension
  const fileExtension = fileName.split(".").pop()?.toLowerCase();

  // Determine MIME type based on file extension
  const fileType = mimeTypes[fileExtension || ""] || "application/octet-stream"; // Default to octet-stream for unknown types

  // Decode base64 data
  const binaryData = atob(base64Data);

  // Convert binary data to byte array (Uint8Array)
  const byteNumbers = new Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    byteNumbers[i] = binaryData.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create Blob from byte array
  const blob = new Blob([byteArray], { type: fileType });

  // Create URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create anchor element
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);

  // Append anchor to body
  document.body.appendChild(link);

  // Trigger download
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
/**
 *
 * @param base64Data
 * @returns
 */
const base64ToFileSize = (base64Data: string) => {
  // Remove the Base64 metadata if present
  // Calculate the padding (if any)
  const padding = base64Data?.match(/=*$/)?.[0]?.length || 0;
  // Calculate the Base64 string length and adjust for padding
  const base64Length = base64Data.length;
  const sizeInBytes = (base64Length * 3) / 4 - padding;
  // Convert bytes to kilobytes
  const sizeInKB = sizeInBytes / 1024;
  return sizeInKB;
};
/**
 *
 * @param size
 * @returns
 */
const FormatFileSize = (size: number): string => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  const i: number = Math.floor(Math.log(size) / Math.log(k));
  return `${(size / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

interface FileObject {
  content?: string;
}
/**
 *
 * @param file
 * @returns
 */
const getImageContent = (file: FileObject | null): string => {
  if (file && file.content) {
    return `data:image/png;base64,${file.content}`;
  }
  return "";
};

export {
  FormatFileSize,
  base64ToFileSize,
  downloadPDF,
  getImageContent,
  downloadFile,
};
