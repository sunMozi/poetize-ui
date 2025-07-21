// pages/ArticleListPage.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  Button,
  Tag,
  Space,
  Avatar,
  message,
  Input,
  Select,
  Form,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { fetchArticleList } from '../../api/articleApi';
import type { ArticleListVO } from '../../types/article';

import { Link } from 'react-router-dom';
import type { Category } from '../../types/category';
import { fetchActiveCategories } from '../../api/categoryApi';
import { toast } from 'react-hot-toast';

const { Option } = Select;

const ArticleListPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [articles, setArticles] = useState<ArticleListVO[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [filters, setFilters] = useState({
    categoryId: undefined as number | undefined,
    authorId: undefined as number | undefined,
    keyword: '',
    sort: 'createTime',
    order: 'desc',
  });

  // 加载文章数据
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchArticleList({
        pageNum,
        pageSize,
        ...filters,
      });
      setArticles(res.rows);
      setTotal(res.totalRows);
    } catch (error: any) {
      message.error('加载文章失败: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  }, [pageNum, pageSize, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 加载分类列表
  useEffect(() => {
    fetchActiveCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        toast.error('加载分类失败: ' + error.message);
      });
  }, []);

  // 查询提交，做空值及类型转换保护
  const onSearch = (values: any) => {
    setFilters({
      categoryId:
        values.categoryId === undefined || values.categoryId === ''
          ? undefined
          : Number(values.categoryId),
      authorId:
        values.authorId === undefined || values.authorId === ''
          ? undefined
          : Number(values.authorId),
      keyword: values.keyword || '',
      sort: values.sort || 'createTime',
      order: values.order || 'desc',
    });
    setPageNum(1);
  };

  // 表格列配置
  const columns: ColumnsType<ArticleListVO> = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      width: 200,
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      width: 120,
      render: (text) => text || '-',
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      width: 250,
      render: (text: string) => {
        if (!text) return '-';
        const maxLen = 60;
        const displayText =
          text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
        return (
          <Tooltip placement="topLeft" title={text}>
            <span>{displayText}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '封面图',
      dataIndex: 'coverImage',
      width: 100,
      render: (url) =>
        url ? (
          <img
            src={url}
            alt="cover"
            className="object-cover w-16 h-10 rounded"
          />
        ) : (
          '-'
        ),
    },
    {
      title: '作者',
      dataIndex: 'authorName',
      width: 140,
      render: (_, record) => (
        <Space>
          <Avatar size="small" src={record.authorAvatar} />
          {record.authorName || '-'}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: number) => {
        const map: Record<number, { text: string; color: string }> = {
          1: { text: '已发布', color: 'green' },
          0: { text: '草稿', color: 'gold' },
          [-1]: { text: '已删除', color: 'red' },
        };
        const info = map[status] ?? { text: '未知', color: 'default' };
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: '浏览',
      dataIndex: 'views',
      width: 80,
    },
    {
      title: '点赞',
      dataIndex: 'likes',
      width: 80,
    },
    {
      title: '评论',
      dataIndex: 'commentsCount',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      render: (val) => format(new Date(val), 'yyyy-MM-dd HH:mm'),
    },
    {
      title: '操作',
      key: 'actions',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Link to={`/admin/articles/${record.articleId}/edit`}>
            <Button type="link" size="small">
              编辑
            </Button>
          </Link>
          <Button
            type="link"
            size="small"
            danger
            onClick={() => {
              message.info(`删除文章 ID: ${record.articleId} 功能待实现`);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* 查询条件区域 */}
      <div className="mb-4">
        <Form layout="inline" form={form} onFinish={onSearch}>
          <Form.Item name="keyword">
            <Input placeholder="搜索标题或摘要" allowClear />
          </Form.Item>

          {/* 分类改为 Select 下拉 */}
          <Form.Item name="categoryId" style={{ minWidth: 160 }}>
            <Select placeholder="请选择分类" allowClear>
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.sortName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="authorId">
            <Input placeholder="作者ID" type="number" allowClear />
          </Form.Item>

          <Form.Item name="sort" initialValue="createTime">
            <Select placeholder="排序字段" style={{ width: 120 }} allowClear>
              <Option value="views">浏览</Option>
              <Option value="likes">点赞</Option>
              <Option value="createTime">创建时间</Option>
            </Select>
          </Form.Item>

          <Form.Item name="order" initialValue="desc">
            <Select placeholder="排序方式" style={{ width: 100 }} allowClear>
              <Option value="asc">升序</Option>
              <Option value="desc">降序</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
                setFilters({
                  categoryId: undefined,
                  authorId: undefined,
                  keyword: '',
                  sort: 'createTime',
                  order: 'desc',
                });
                setPageNum(1);
              }}
            >
              清空
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to="/admin/articles/create">
              <Button type="default">新建文章</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>

      {/* 表格展示区域 */}
      <Table
        rowKey="articleId"
        loading={loading}
        columns={columns}
        dataSource={articles}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: false,
          onChange: (page) => setPageNum(page),
        }}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </div>
  );
};

export default ArticleListPage;
