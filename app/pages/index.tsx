import {
  Table,
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Slider,
  Switch,
  Badge,
  Tag
} from 'antd'
import type { DatePickerProps } from 'antd'
import { ExperimentOutlined, SmileFilled } from '@ant-design/icons'
import Link from 'next/link'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table';

const FormItem = Form.Item
const Option = Select.Option

const content = {
  marginTop: '100px',
}

export default function Home() {

  interface DataType {
    key: string;
    id: string;
    timestamp_added: number;
    last_tx_timestamp: string;
    last_tx_hash: string;
    status: string;
  }


    const [tableLogsAntd, setTableLogsAntd] = useState([]);
    // Keep track of table collection-specific logs
    const [tableCollectionLogsAntd, setTableCollectionLogsAntd] = useState([]);



  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Contract Address',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <a href={`https://testnet.aurorascan.dev/address/${id}`} target="_blank" rel="noreferrer">{id.toString().slice(0, 6).concat("...").concat(id.toString().slice(-4))}</a>,
    },
    {
      title: 'Timestamp Added',
      dataIndex: 'timestamp_added',
      key: 'timestamp_added',
    },
    {
      title: 'Last Updated',
      dataIndex: 'last_tx_timestamp',
      key: 'last_tx_timestamp',
    },
    {
      title: 'Tx Hash',
      dataIndex: 'last_tx_hash',
      key: 'last_tx_hash',
      render: (last_tx_hash) => <a href={`https://testnet.aurorascan.dev/tx/${last_tx_hash}`} target="_blank" rel="noreferrer">{last_tx_hash.toString().slice(2, 6).concat("...").concat(last_tx_hash.toString().slice(-4))}</a>,
    },
    {
      title: 'Status',
      key: 'state',
      render: () => (
        <span>
          <Badge status="processing" />
          Syncing
        </span>
      ),
    }
  ];

  const data: DataType[] = [
    {
      key: '1',
      id: '0x0000000000000000000000000000000000000000',
      timestamp_added: 1620000000,
      last_tx_timestamp: '2021-05-01 12:00:00',
      last_tx_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      status: 'Syncing'
    },
    {
      key: '2',
      id: '0x0000000000000000000000000000000000000001',
      timestamp_added: 1620000000,
      last_tx_timestamp: '2021-05-01 12:00:00',
      last_tx_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      status: 'Syncing'
    },
    {
      key: '3',
      id: '0x0000000000000000000000000000000000000002',
      timestamp_added: 1620000000,
      last_tx_timestamp: '2021-05-01 12:00:00',
      last_tx_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      status: 'Syncing'
    }
  ];


  // render the table in the DOM
  const renderTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
      />
    )
  }


  const onDatePickerChange: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
    console.log(date, dateString)
  }

  return (
    <div style={content}>
      <div className="text-center mb-5">
        <Link href="#">
          <a className="logo mr-0">
            <SmileFilled style={{ fontSize: 48 }} />
          </a>
        </Link>

        <p className="mb-0 mt-3 text-disabled">Welcome to the world !</p>
      </div>
      <div>
        <Form
          layout="horizontal"
          size={'large'}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <FormItem label="Input Number">
            <InputNumber
              min={1}
              max={10}
              style={{ width: 100 }}
              defaultValue={3}
              name="inputNumber"
            />
          </FormItem>

          <FormItem label="Switch">
            <Switch defaultChecked />
          </FormItem>

          <FormItem label="Slider">
            <Slider defaultValue={70} />
          </FormItem>

          <FormItem label="Select">
            <Select defaultValue="lucy" style={{ width: 192 }}>
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
              <Option value="disabled" disabled>
                disabled
              </Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
          </FormItem>

          <FormItem label="DatePicker">
            <DatePicker showTime onChange={onDatePickerChange} />
          </FormItem>
          <FormItem style={{ marginTop: 48 }} wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
            <Button style={{ marginLeft: 8 }}>Cancel</Button>
          </FormItem>
        </Form>
        <Table columns={columns} dataSource={data} />
        {renderTable()}
      </div>
    </div>
  )
}
