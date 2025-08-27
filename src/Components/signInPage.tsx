import { Layout, Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function SignInFullPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = (values) => {
    console.log("Login Data:", values);
    navigate("/AuthPortal/signup");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{ background: "#016b5d", textAlign: "center", height: 100 }}
      >
        <div>
          <h2 style={{ color: "white", margin: 0, lineHeight: "40px", fontWeight: "normal" }}>
            Login
          </h2>
          <div style={{ color: "#76b9b1", lineHeight: "40px" }}>
            Sign in to continue
          </div>
        </div>
      </Header>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f2f5",
        }}
      >
        <div
          style={{
            width: 600,
            background: "white",
            padding: 30,
            borderRadius: 8,
          }}
        >
          <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
                {
                  pattern: /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-+=\[\]\/\\~`';]+$/,
                  message:
                    "Username can only contain letters, numbers, and @ . _ -",
                },
                {
                  min: 4,
                  message: "Username must be at least 4 characters long",
                },
              ]}
            >
              <Input placeholder="USERNAME" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 8, message: "Password must be at least 8 characters" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                  message:
                    "Password must include uppercase, lowercase, number, and special character",
                },
              ]}
            >
              <Input.Password
                placeholder="PASSWORD"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "#016b5d" }}
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>

          <p style={{ textAlign: "center" }}>
            Don&apos;t have an Account? <Link to="/AuthPortal/signup">Sign Up</Link>
          </p>
        </div>
      </Content>
    </Layout>
  );
}
