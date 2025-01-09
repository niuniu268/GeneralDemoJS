import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import img404 from '../../assets/react.svg'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {useEffect, useState} from "react";
import { http} from "../../utils";
import {getArticleListAPI} from "../../apis/article";


const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const [channels, setChannels] = useState([])
    useEffect(() => {

        async function fetchChannels() {
            const res = await http.get('/channels')
            setChannels(res.data.channels)
        }

        fetchChannels()
    }, [])

    const status = {
        1: <Tag color='warning'>待审核</Tag>,
        2: <Tag color='success'>审核通过</Tag>,
    }


    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]

    const [reqData, setReqData] = useState({
        page: 2,
        per_page: 2,
        begin_pubdate: '',
        end_pubdate: '',
        status: '',
        channel_id: ''
    })

    // // 获取文章列表
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    //
    // async function getList (reqData = {}) {
    //     const res = await getArticleListAPI(reqData)
    //     setList(res.data.results)
    //     setCount(res.data.total_count)
    // }
    //
    // useEffect(() => {
    //     getList()
    // }, [reqData])
    //
    // // 筛选文章列表
    // //
    // const onFinish = (formValue) => {
    //     console.log(formValue.date[0].format('YYYY-MM-DD') + " " + formValue.date[1].format('YYYY-MM-DD'))
    //     setReqData({
    //         ...reqData,
    //         channel_id: formValue.channel_id,
    //         status: formValue.status,
    //         begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
    //         end_pubdate: formValue.date[1].format('YYYY-MM-DD'),
    //     })
    // }

    useEffect(() => {
        async function getList () {
            const res = await getArticleListAPI(reqData)
            setList(res.data.results)
            setCount(res.data.total_count)
        }
        getList()
    }, [reqData])


    // 2. 获取筛选数据
    const onFinish = (formValue) => {
        console.log(formValue)
        // 3. 把表单收集到数据放到参数中(不可变的方式)
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')
        })
        // 4. 重新拉取文章列表 + 渲染table逻辑重复的 - 复用
        // reqData依赖项发生变化 重复执行副作用函数
    }


    const onPageChange = (page) => {
        console.log(page)
        // 修改参数依赖项 引发数据的重新获取列表渲染
        setReqData({
            ...reqData,
            page
        })
    }

    return (
    <div>
        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '文章列表' },
                ]} />
            }
            style={{ marginBottom: 20 }}
        >
            <Form initialValues={{ status: '' }} onFinish={onFinish} onFinishFailed={(errorInfo) => {
                console.error('Failed:', errorInfo);
            }}
            >
                <Form.Item label="状态" name="status">
                    <Radio.Group>
                        <Radio value={''}>全部</Radio>
                        <Radio value={1}>待审核</Radio>
                        <Radio value={2}>审核通过</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="频道" name="channel_id">
                    <Select
                        placeholder="请选择文章频道"
                        style={{ width: 120 }}
                    >
                        {channels.map(item => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}

                    </Select>
                </Form.Item>

                <Form.Item label="日期" name="date">
                    <RangePicker></RangePicker>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                        筛选
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
            <Table rowKey="id"  columns={columns} dataSource={list}
                   pagination={{
                       total: count,
                       pageSize: reqData.per_page,
                       onChange: onPageChange
                   }}
            />
        </Card>
    </div>
)
}

export default Article

