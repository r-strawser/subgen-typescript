export function FETCH_CONTRACT_ADDED() {
    return `query {
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
      }`;
  }