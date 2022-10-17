import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.css";
import { Container, Grid, Card, Text, Table, Row, Col, Tooltip, User, Link, Badge } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FETCH_CONTRACT_ADDED } from "../queries";
import { subgraphQuery } from "../utils";
import React from 'react';

type ContractType = {
  key: string | undefined,
  id?: string,
  timestamp_added?: string | number,
  last_tx_timestamp?: string | number,
  last_tx_hash?: string,
};

const Home: NextPage = () => {

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
    },
  ];

  const renderCell = (contract: any, columnKey: React.Key) => {
    const cellValue = contract[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <>
            <Link href={`https://testnet.aurorascan.dev/address/${cellValue}`} target="_blank" rel="noopener noreferrer" isExternal>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue.toString()}
            </Text>
            </Link>
          </>
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
          <>
            <Link href={`https://testnet.aurorascan.dev/tx/${cellValue}`} target="_blank" rel="noopener noreferrer" block isExternal>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue.toString().slice(2, 6).concat("...").concat(cellValue.toString().slice(-4))}
            </Text>
            </Link>
          </>
        );
        // case "status":
        // return <Badge variant="points" color="primary">{cellValue}</Badge>;
        
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
      // console.log("the contracts", _contracts);
      let _tableData: ContractType[] = [];

      _contracts.forEach((contract: ContractType) => {
        _tableData.push({
          key: contract.id,
          id: contract.id,
          timestamp_added: contract.timestamp_added,
          last_tx_timestamp: contract.last_tx_timestamp,
          last_tx_hash: contract.last_tx_hash,
          
        });
      });

      // console.log("tableData", _tableData);
      setTableData(_tableData);
       //console.log("data", _rawData);
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

  useEffect(() => {
    getTableData();
      setInterval(() => {
        getTableData();
      }, 30000);
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Subgen</title>
        <meta name="description" content="No-Code Subgraph Generation Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Text 
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold">
            Simple Subgraph Factory
        </Text>

        <div className={styles.description}>
          <Text h4>
          1. Submit an Aurora testnet contract address that is using a supported standard <a className={styles.submissionText} href="https://testnet.aurorascan.dev/address/0xA03e6e0ACd9C6Ee4403df08B1F4B2a4eccDf72a9#writeContract" target="_blank" rel="noopener noreferrer" >here</a>.
          </Text>

          <Text h4>2. Call functions that fire transfer events from your contract.</Text>
          <Text h4>3. Query the subgraph.</Text>
        </div>
        

        <Container>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Total Contracts Syncing', tableData.length)}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Template Type', 'Transfers')}
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            {renderSimpleCard('Supported Contract Interfaces', 'ERC721')}
          </Grid>
        </Grid.Container>
        <Table
          aria-label="table"
          css={{ overflowX: "auto" }}
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
        </Container>
      </main>

      <footer className={styles.footer}>
        <Link href="https://github.com/r-strawser" target="_blank"
          rel="noopener noreferrer" block>
          <Text b size={14} css={{ tt: "capitalize" }}>
            GitHub Repo
          </Text>
        </Link>
      </footer>
    </div>
  )
}

export default Home