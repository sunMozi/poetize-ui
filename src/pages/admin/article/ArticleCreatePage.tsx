import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  InputNumber,
  Row,
  Col,
  Card,
  Tabs,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import './ArticleCreatePage.css'; // 新增CSS文件

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const ArticleCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit'); // 标签页状态

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      const payload = { ...values, content: markdownContent };
      console.log('提交数据:', payload);
      message.success('文章创建成功');
      navigate('/admin/articles');
    } catch (error) {
      message.error('创建失败，请稍后重试' + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="article-create-container">
      <div className="header-section">
        <h1 className="page-title">创建新文章</h1>
        <p className="page-description">填写文章信息并编辑内容</p>
      </div>

      <Card className="form-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: 1, sortOrder: 0 }}
        >
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item
                label={<span className="form-label">标题</span>}
                name="title"
                rules={[{ required: true, message: '请输入文章标题' }]}
              >
                <Input placeholder="请输入文章标题" allowClear size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<span className="form-label">URL别名</span>}
                name="slug"
              >
                <Input
                  placeholder="用于SEO的URL别名，可选"
                  allowClear
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<span className="form-label">摘要</span>}
            name="summary"
          >
            <TextArea
              rows={3}
              placeholder="简要介绍文章内容"
              allowClear
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item
            label={<span className="form-label">封面图</span>}
            name="coverImage"
          >
            <Upload
              name="file"
              listType="picture-card"
              maxCount={1}
              className="cover-uploader"
              accept="image/*"
            >
              <div className="upload-button">
                <div style={{ marginTop: 8 }}>上传封面</div>
              </div>
            </Upload>
          </Form.Item>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label={<span className="form-label">分类</span>}
                name="categoryId"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select placeholder="请选择分类" allowClear size="large">
                  <Option value={1}>前端开发</Option>
                  <Option value={2}>后端开发</Option>
                  <Option value={3}>系统架构</Option>
                  <Option value={4}>人工智能</Option>
                  <Option value={5}>数据分析</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={<span className="form-label">作者ID</span>}
                name="authorId"
                rules={[{ required: true, message: '请输入作者ID' }]}
              >
                <InputNumber
                  placeholder="请输入作者ID"
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={<span className="form-label">排序值</span>}
                name="sortOrder"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  min={0}
                  max={100}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label={<span className="form-label">状态</span>}
                name="status"
              >
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
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="editor-tabs"
        >
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
                {markdownContent || '输入内容后，这里将显示预览效果'}
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
          发布文章
        </Button>
      </div>
    </div>
  );
};

export default ArticleCreatePage;
