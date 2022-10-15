import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.css";
import { Grid, Card, Text, Table, Row, Col, Tooltip, User } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FETCH_CONTRACT_ADDED } from "../queries";
import { subgraphQuery } from "../utils";
import React from 'react';

type UserType = {
  id: string | number,
  name?: string,
  email?: string,
  role?: string,
  team?: string,
  status: "active" | "paused" | "vacation",
  age?: string,
  avatar?: string,
};

type ContractType = {
  key: string | undefined,
  id?: string,
  timestamp_added?: string | number,
  last_tx_timestamp?: string | number,
  last_tx_hash?: any
};

const Home: NextPage = () => {

  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any>([]);

  const forceUpdate = React.useReducer(() => ({}), {})[1];

  
  const columns = [
    {
      key: "id",
      label: "Contract Address",
    },
    {
      key: "timestamp_added",
      label: "Timestamp Added",
    },
    {
      key: "last_tx_timestamp",
      label: "Last Updated",
    },
    {
      key: "last_tx_hash",
      label: "Tx Hash"
    }
  ];

  const contracts: ContractType[] = [
    {
      key: "0x0000000000000000000000000000000000000001",
      id: "0x0000000000000000000000000000000000000001",
      timestamp_added: "2021-09-01T00:00:00.000Z",
      last_tx_timestamp: "2021-09-01T00:00:00.000Z",
      last_tx_hash: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      key: "0x0000000000000000000000000000000000000002",
      id: "0x0000000000000000000000000000000000000002",
      timestamp_added: "2021-09-01T00:00:00.000Z",
      last_tx_timestamp: "2021-09-01T00:00:00.000Z",
      last_tx_hash: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      key: "0x0000000000000000000000000000000000000003",
      id: "0x0000000000000000000000000000000000000003",
      timestamp_added: "2021-09-01T00:00:00.000Z",
      last_tx_timestamp: "2021-09-01T00:00:00.000Z",
      last_tx_hash: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
  ];

  const renderCell = (contract: ContractType, columnKey: React.Key) => {
    const cellValue = contract[columnKey];
    switch (columnKey) {
      case "id":
        return (
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
        );
      case "timestamp_added":
        return (
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
        );
        case "last_tx_timestamp":
        return (
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
        );
        case "last_tx_hash":
        return (
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
        );
      default:
        return cellValue;
    }
  };
  

  const getTableData = async () => {
    try {
      // get the query data
      const _rawData = await subgraphQuery(`query {
        contracts {
            id
            as721 (orderBy: last_tx_timestamp, orderDirection: desc) {
              id
              total_transfers
              contractAddress
              last_tx_timestamp
              timestamp_added
              last_tx_hash
            }
          }
      }`);



      


      const _contracts: ContractType[] = _rawData.contracts[0].as721;
      console.log("the contracts", _contracts);
      let _tableData: ContractType[] = [];

      _contracts.forEach((contract: ContractType) => {
        _tableData.push({
          key: contract.id,
          id: contract.id,
          timestamp_added: contract.timestamp_added,
          last_tx_timestamp: contract.last_tx_timestamp,
          last_tx_hash: contract.last_tx_hash
        });
      });


      // if (_contracts.length > 0) {
      //   if(_contracts.id !== null) {
      //     console.log("hello", _contracts.id);
      //   }
      // }

      



      console.log("tableData", _tableData);
      setTableData(_tableData);
      console.log("data", _rawData);
      forceUpdate();
    } catch (error) {
      console.log("error", error);
    }
  }

  

  

  const renderSimpleCard = (title: string, content: any) => {
    return (
    <Card>
      <Card.Body>
        <Text>{title}</Text>
        <Text h4>{content}</Text>
      </Card.Body>
    </Card>
    );
  }

  const renderKpiGrid = () => {
    return (
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={6} lg={4}>
          {renderSimpleCard("Total Users", 100)}
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {renderSimpleCard("Total Users", 100)}
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {renderSimpleCard("Total Users", 100)}
        </Grid>
      </Grid.Container>
    );
  }


  const renderTable = () => {
    return (
      <Table>

      </Table>
    )

  }

  useEffect(() => {
    getTableData();
      setInterval(() => {
        getTableData();
      }, 30000);
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Users', 100)}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Orders', 100)}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Revenue', 100)}
          </Grid>
        </Grid.Container>
      </main> */}

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Users', 100)}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Orders', 100)}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Revenue', 100)}
          </Grid>
        </Grid.Container>
        <Table
          aria-label="Example table with custom cells"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="none"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.key}
              >
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={tableData}>
            {(item: ContractType) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        {renderSimpleCard("Total Contracts Syncing", 100)}

        <div className={styles.grid}>

        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Users', 100)}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Orders', 100)}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Revenue', 100)}
          </Grid>
        </Grid.Container>
        {renderSimpleCard("Total Contracts Syncing", 100)}
        {/* {getTableData} */}
          
        {/* <Table
          aria-label="Example table with custom cells"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="none"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.key}
              >
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={tableData}>
            {(item: ContractType) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table> */}

          
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
