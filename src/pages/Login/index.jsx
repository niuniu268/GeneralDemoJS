import {Card, Form, Input, Button, message} from 'antd'
import logo from '../../assets/react.svg'
import "./index.scss"
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {fetchLogin} from "../../store/modules/user";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish =  async (formValue) => {
        await dispatch(fetchLogin(formValue))
        navigate('/')
        message.success('success')
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form validateTrigger={['onBlur']}
                onFinish={onFinish}
                >
                    <Form.Item
                    name="mobile"
                    rules={[
                        {required: true, message:'input cellphone number'},
                        {
                            pattern: /^1[3-9]\d{9}$/,
                            message: 'format is not correct'
                        }
                    ]}
                >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                    name="code"
                    rules={[
                        {required: true, message:'input cellphone number'},
                    ]}>
                        <Input size="large" placeholder="请输入验证码" maxLength={6} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
