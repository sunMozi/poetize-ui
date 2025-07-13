import { useCallback, useEffect, useState } from 'react';
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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { fetchArticleList } from '../../api/articleApi';
import type { ArticleListVO } from '../../types/article';
import { Link } from 'react-router-dom';

const { Option } = Select;

const ArticleListPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [articles, setArticles] = useState<ArticleListVO[]>([]);

  const [filters, setFilters] = useState({
    categoryId: undefined as number | undefined,
    authorId: undefined as number | undefined,
    keyword: '',
    sort: 'createTime',
    order: 'desc',
  });

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
    } catch (error) {
      message.error('加载文章失败: ' + error);
    } finally {
      setLoading(false);
    }
  }, [pageNum, pageSize, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSearch = (values: any) => {
    setFilters({
      categoryId: values.categoryId || undefined,
      authorId: values.authorId || undefined,
      keyword: values.keyword || '',
      sort: values.sort || 'createTime',
      order: values.order || 'desc',
    });
    setPageNum(1);
  };

  const columns: ColumnsType<ArticleListVO> = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      width: 200,
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      ellipsis: true,
      width: 250,
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
      title: '来源',
      dataIndex: 'authorSourceType',
      width: 80,
      render: (type: number) => {
        const map = ['内部', '外部', '采集'];
        const color = ['blue', 'orange', 'purple'];
        return (
          <Tag color={color[type] || 'default'}>{map[type] || '未知'}</Tag>
        );
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
      render: (val) => format(new Date(val), 'yyyy-MM-dd'),
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
          <Form.Item name="categoryId">
            <Input placeholder="分类ID" type="number" />
          </Form.Item>
          <Form.Item name="authorId">
            <Input placeholder="作者ID" type="number" />
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
