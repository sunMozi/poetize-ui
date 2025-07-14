import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Row,
  Col,
  Card,
  Tabs,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import './ArticleCreatePage.css';
import UploadImage from '../../../components/admin/UploadImage';
import type { Category } from '../../../types/category';
import { fetchActiveCategories } from '../../../api/categoryApi';
import toast from 'react-hot-toast';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const ArticleEditPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveCategories()
      .then((data) => setCategories(data))
      .catch((error) => toast.error('加载分类失败: ' + error.message));
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
  }, [slug]);

  const onFinish = async (values: any) => {
    if (!slug) return;
    setSubmitting(true);
    try {
      console.log('Submitting article with values:', values);
      toast.success('文章更新成功');
      navigate('/admin/articles');
    } catch (error: any) {
      toast.error('更新失败，请稍后重试: ' + (error.message || '未知错误'));
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="article-create-container">
      <div className="header-section">
        <h1 className="page-title">编辑文章</h1>
        <p className="page-description">修改文章内容与信息</p>
      </div>

      <Card className="form-card" loading={loading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item
                label={<span className="form-label">标题</span>}
                name="title"
                rules={[{ required: true, message: '请输入文章标题' }]}
              >
                <Input allowClear size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="URL别名" name="slug">
                <Input allowClear size="large" disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="摘要" name="summary">
            <TextArea rows={3} allowClear maxLength={200} showCount />
          </Form.Item>

          <Form.Item label="封面图" name="coverImage">
            <UploadImage uploadUrl="/api/common/upload/image" />
          </Form.Item>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="分类"
                name="categoryId"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select
                  allowClear
                  size="large"
                  loading={categories.length === 0}
                >
                  {categories.map((cat) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.sortName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="排序值" name="sortOrder">
                <InputNumber
                  min={0}
                  max={100}
                  size="large"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label="状态" name="status">
                <Select size="large">
                  <Option value={1}>发布</Option>
                  <Option value={0}>草稿</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="editor-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="编辑内容" key="edit">
            <TextArea
              rows={18}
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder="请输入 Markdown 格式的文章内容"
              className="markdown-editor"
            />
          </TabPane>
          <TabPane tab="预览效果" key="preview">
            <div className="preview-container markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent || '暂无内容'}
              </ReactMarkdown>
            </div>
          </TabPane>
        </Tabs>
      </Card>

      <div className="action-bar">
        <Button
          type="default"
          size="large"
          onClick={() => navigate('/admin/articles')}
          className="action-button"
        >
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => form.submit()}
          loading={submitting}
          className="action-button submit-button"
        >
          保存修改
        </Button>
      </div>
    </div>
  );
};

export default ArticleEditPage;
