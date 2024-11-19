FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/base:ubuntu-24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    git-all \
    build-essential \
    pkg-config \
    libssl-dev \
    libclang-dev \
    libpq-dev \
    cmake \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

RUN curl --retry 5 -fSL https://github.com/MystenLabs/sui/releases/download/mainnet-v1.37.3/sui-mainnet-v1.37.3-ubuntu-x86_64.tgz -o sui-mainnet-v1.37.3-ubuntu-x86_64.tgz \
    && tar -xzf sui-mainnet-v1.37.3-ubuntu-x86_64.tgz \
    && mv sui /usr/local/bin/ \
    && mv sui-* /usr/local/bin/ \
    && mv move-analyzer /usr/local/bin/ \
    && sui --version

RUN curl --retry 5 -fSL https://storage.googleapis.com/mysten-walrus-binaries/walrus-testnet-latest-ubuntu-x86_64-generic -o /usr/local/bin/walrus \
    && chmod +x /usr/local/bin/walrus \
    && walrus --version

ENV PATH="/usr/local/bin:${PATH}"
