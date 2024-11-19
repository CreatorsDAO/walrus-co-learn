#! /bin/bash

echo "=== Switching to Sui testnet ==="
sui client switch --env testnet
sui client envs

echo "=== Requesting sui testnet faucet ==="
sui client faucet
check_gas=$(sui client gas)
echo "$check_gas"
while [[ "$check_gas" == *"No coins found for this address."* ]]; do
    sleep 3
    echo "$check_gas"
done
sui client balance

echo "=== NOTE: You keystore saved in config/sui/keystore ==="

echo "=== Requesting walrus testnet faucet ==="
walrus get-wal
while ! sui client balance | grep -q "WAL"; do
    sleep 3
done
sui client balance
