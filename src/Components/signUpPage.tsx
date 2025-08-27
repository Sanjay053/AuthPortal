import { Button, Form, Input, Row, Col, Select, Layout, theme } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

const { Content } = Layout;
const { useToken } = theme;

export default function SignUp() {
  const { token } = useToken();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form Submitted:", values);
    navigate("/"); // Redirect after signup
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="+91">
      <Select style={{ width: 80 }}>
        <Select.Option value="+91">+91</Select.Option>
        <Select.Option value="+1">+1</Select.Option>
        <Select.Option value="+44">+44</Select.Option>
        <Select.Option value="+971">+971</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ background: "#016b5d", textAlign: "center", height: 100 }}
      >
        <div>
          <h2
            style={{
              color: "white",
              margin: 0,
              lineHeight: "40px",
              fontWeight: "normal",
            }}
          >
            Sign Up
          </h2>
          <div style={{ color: "#76b9b1", lineHeight: "40px" }}>
            Create new Account
          </div>
        </div>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 900, // make it wide
            background: "white",
            borderRadius: "8px",
            padding: "32px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* SignUp Form */}
          <div
            style={{
              padding: "24px",
              background: "white",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <Form form={form} onFinish={handleFinish} layout="vertical">
              {/* Name & Username */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                      {
                        pattern: /^[A-Za-z\s]+$/,
                        message: "Name must contain only alphabets",
                      },
                    ]}
                  >
                    <Input placeholder="NAME" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "Please enter your username" },
                      {
                        pattern:
                          /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-+=\[\]\/\\~`';]+$/,
                        message:
                          "Only letters, numbers, and special characters are allowed",
                      },
                      {
                        min: 4,
                        message: "Username must be at least 4 characters long",
                      },
                    ]}
                  >
                    <Input placeholder="USERNAME" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Email & Phone */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Enter valid Gmail" },
                      {
                        pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                        message: "Only Gmail allowed",
                      },
                    ]}
                  >
                    <Input placeholder="EMAIL" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: "Please enter phone number" },
                      {
                        pattern: /^[0-9]{7,12}$/,
                        message: "Enter valid phone (7–12 digits)",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Password & Confirm */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    dependencies={["username"]}
                    rules={[
                      { required: true, message: "Please enter password" },
                      {
                        pattern: /^[a-zA-Z0-9._-]+$/,
                        message: "Only alphanumeric & . _ -",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || value !== getFieldValue("username")) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Password cannot be same as Username")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="NEW PASSWORD"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm password" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="CONFIRM NEW PASSWORD"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Submit */}
              <Row justify="end">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: "#016b5d" }}
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
