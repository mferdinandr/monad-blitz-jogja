# MonTap 🎯

**MonTap** is a decentralized prediction market built on [Monad](https://monad.xyz) where users predict the next price direction of assets. Tap UP or DOWN, wait for settlement, and win USDC rewards

> Built for **Monad Blitz Jogja** Hackathon

---

## The Problem

Traditional prediction markets are hindered by steep learning curves, prohibitive gas costs, and slow execution speeds that alienate retail participants from real-time price action.

## The Solution

MonTap leverages Monad's parallel execution and Pyth's high-fidelity feeds to deliver a frictionless experience where users can atomically enter multiple predictions across various assets in a single block with instant settlement.

---

## ✨ Key Features

### 👆 Single Tap

The simplest prediction experience. Choose one market, pick **UP** or **DOWN**, and wait for settlement. Perfect for quick rounds and beginners.

### ⚡ Parallel Multi Tap _(Monad Exclusive)_

Powered by Monad's parallel transaction execution. Open multiple predictions across different markets **simultaneously in a single block** — zero conflicts, maximum throughput.

### Other Highlights

- **Pyth Oracle** — Real-time high-fidelity price feeds
- **Account Abstraction** — Privy-powered smart wallets (no seed phrases)
- **Multi-Market** — Crypto, forex, indices, commodities, and stocks
- **Instant Settlement** — On-chain win detection and auto-settlement via the solver

---

## 🏗️ Architecture

```
monad-blitz-jogja/
├── fe/          # Next.js 16 frontend (React 19, Tailwind CSS v4, Wagmi/Privy)
├── be/          # TapX Solver — Node.js/TypeScript off-chain engine
└── sc/          # Smart Contracts — Solidity 0.8.24, Foundry
```

### Frontend (`fe/`)

- **Framework**: Next.js 16 with Turbopack, React 19
- **Wallet**: Privy (Account Abstraction) + Wagmi v2 + viem
- **Charts**: KLineCharts, Lightweight Charts
- **UI**: Tailwind CSS v4, Radix UI, Lucide Icons
- **3D / Animation**: Three.js, React Three Fiber, GSAP, Lenis

### Backend — TapX Solver (`be/`)

The off-chain solver is a TypeScript/Node.js service responsible for:

| Service         | Role                                                      |
| --------------- | --------------------------------------------------------- |
| `BetScanner`    | Scans on-chain events for open bets                       |
| `PriceWatcher`  | Streams real-time Pyth price feeds via Hermes             |
| `WinDetector`   | Compares entry price vs. current price to detect wins     |
| `Settler`       | Submits Pyth price proofs on-chain to settle winning bets |
| `ExpiryCleanup` | Handles expired/unresolved bets                           |

The server exposes HTTP + WebSocket endpoints for the frontend to consume live price and bet data.

### Smart Contracts (`sc/`)

| Contract               | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `TapBetManager.sol`    | Core contract — manages bet lifecycle (open, resolve, settle) |
| `PriceAdapter.sol`     | Wraps Pyth Network for on-chain price verification            |
| `MultiplierEngine.sol` | Calculates reward multipliers based on bet parameters         |

- **Language**: Solidity 0.8.24
- **Toolchain**: Foundry (Monad-compatible)
- **Oracle**: Pyth Network (`pyth-sdk-solidity`)
- **Network**: Monad Testnet (`https://testnet-rpc.monad.xyz`)

---

## 📦 Deployed Contracts (Monad Testnet)

| Contract         | Address                                      |
| ---------------- | -------------------------------------------- |
| TapBetManager    | `0x8bA21f8c8c0216C6c877d5339a17D4c949b59561` |
| TapVault         | `0xC13d588F67846d08916755a940b0a0d38fD656AA` |
| MultiplierEngine | `0x9A069de65Ac50588EF8CE4642ab5394b0B15a92C` |
| PriceAdapter     | `0x3d805df43486d8CB1159C59C045Cb9565aaB5F62` |
| USDC (Mock)      | `0xCE342F66c90124fe9d0492eF65556fd58e0023d7` |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- Foundry (for smart contracts)
- A Privy App ID
- Alchemy RPC URL for Monad Testnet

### 1. Frontend

```bash
cd fe
cp .env.example .env   # fill in your env vars
npm install
npm run dev            # starts at http://localhost:3000
```

**Required env vars (`fe/.env`):**

```env
NEXT_PUBLIC_PRIVY_APP_ID=...
NEXT_PUBLIC_TAP_BET_MANAGER=...
NEXT_PUBLIC_TAP_VAULT=...
NEXT_PUBLIC_MULTIPLIER_ENGINE=...
NEXT_PUBLIC_PRICE_ADAPTER=...
NEXT_PUBLIC_USDC_ADDRESS=...
NEXT_PUBLIC_PYTH_BTC_PRICE_ID=...
NEXT_PUBLIC_PYTH_ETH_PRICE_ID=...
NEXT_PUBLIC_RPC_URL=...
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 2. Backend (Solver)

```bash
cd be
cp .env.example .env   # fill in your env vars
npm install
npm run dev            # starts at http://localhost:3001
```

**Required env vars (`be/.env`):**

```env
RPC_URL=https://testnet-rpc.monad.xyz
PRIVATE_KEY=...        # relayer wallet private key
TAP_BET_MANAGER=...
PYTH_ENDPOINT=https://hermes.pyth.network
PORT=3001
```

### 3. Smart Contracts

```bash
cd sc
cp .env.example .env
forge install
forge build
forge test

# Deploy
./deploy.sh
```

---

## 🛠️ Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Blockchain       | Monad Testnet                               |
| Smart Contracts  | Solidity 0.8.24, Foundry                    |
| Oracle           | Pyth Network                                |
| Frontend         | Next.js 16, React 19, TypeScript            |
| Wallet / Auth    | Privy (Account Abstraction), Wagmi v2, viem |
| Styling          | Tailwind CSS v4, Radix UI                   |
| Backend / Solver | Node.js, TypeScript, Express, WebSocket     |
| Analytics        | Vercel Analytics                            |

---

## 📊 How a Prediction Works

```
1. User connects wallet (Privy smart wallet)
2. User selects a market (e.g. BTC/USDC) and taps UP or DOWN
3. TapBetManager records the bet with entry price from PriceAdapter (Pyth)
4. Solver (be/) watches the price via Pyth Hermes WebSocket
5. When price moves past threshold → WinDetector fires
6. Settler submits Pyth proof on-chain → TapBetManager settles the bet
7. Winner receives USDC payout from TapVault
```

**Parallel Multi Tap**: Steps 2–3 are batched across multiple markets in one block via Monad's parallel execution, allowing atomic multi-market predictions.

---

## 📁 Project Structure

```
fe/src/
├── app/               # Next.js pages & layouts
├── components/        # UI components (layout, trading, wallet)
├── features/          # Feature-level modules
├── hooks/             # Custom React hooks (wallet, data, utils)
├── config/            # Chain & contract config
├── contracts/         # ABI definitions
└── types/             # TypeScript types

be/src/
├── services/          # BetScanner, PriceWatcher, WinDetector, Settler, ExpiryCleanup
├── routes/            # HTTP API routes
├── config/            # Env config
└── utils/             # Logger and helpers

sc/src/
├── trading/           # TapBetManager, PriceAdapter, MultiplierEngine
├── token/             # USDC mock token
├── treasury/          # TapVault
└── paymaster/         # Gas relayer paymaster
```

---

## 📄 License

MIT — built with 💜 for the Monad ecosystem.
