import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import type {
  UploadFile,
  RcFile,
  UploadChangeParam,
} from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

interface UploadImageProps {
  value?: string; // 文件URL
  onChange?: (url: string) => void;
  maxSizeMB?: number;
  accept?: string;
  uploadUrl: string; // 上传接口地址
  headers?: Record<string, string>;
  disabled?: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({
  value,
  onChange,
  maxSizeMB = 2,
  accept = 'image/*',
  uploadUrl,
  headers,
  disabled = false,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: '-1',
          name: '已上传图片',
          status: 'done',
          url: value,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const beforeUpload = (file: RcFile) => {
    const isValidType = accept
      .split(',')
      .some((type) => file.type.match(type.trim()));
    if (!isValidType) {
      toast.error(`只允许上传格式为: ${accept} 的文件`);
      return Upload.LIST_IGNORE;
    }
    const isLtMaxSize = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtMaxSize) {
      toast.error(`文件必须小于 ${maxSizeMB}MB`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // 限制为最后一个文件
    setFileList(newFileList);

    if (info.file.status === 'done') {
      const response = info.file.response;
      const url = response?.data || '';

      if (url) {
        onChange?.(url);
        toast.success(`${info.file.name} 上传成功`);
      } else {
        toast.error(response?.message || '上传失败，服务器未返回地址');
      }
    } else if (info.file.status === 'error') {
      toast.error(`${info.file.name} 上传失败`);
    } else if (info.file.status === 'removed') {
      onChange?.('');
    }
  };

  return (
    <Upload
      action={uploadUrl}
      headers={headers}
      fileList={fileList}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      listType="picture-card"
      disabled={disabled}
      maxCount={1}
    >
      {fileList.length >= 1 ? null : (
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadImage;
