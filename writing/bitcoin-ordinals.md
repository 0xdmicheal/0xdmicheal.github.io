---
title: Ordinals put art back on Bitcoin. I was there for it.
date: 2025-06-21
summary: Two and a half years after launch, Ordinals are past 65 million inscriptions and $458 million in fees. What actually changed, what still breaks, and what I learned shipping one of Mongolia's first collections.
tag: Bitcoin
---

In January 2023 most people I knew still called Bitcoin digital gold and nothing else. A few months later we were drawing punks on a 24-pixel grid and inscribing them straight onto sats. That shift is the whole story of Ordinals, and I got to work inside it.

This is my read on where it stands in June 2025: what Ordinals are, how we got here, and what I think matters next.

## What Ordinals actually are

Casey Rodarmor's idea is simple. Every satoshi gets a number, in the order it was mined, first in, first out. Once a sat has a number it has an identity, and once it has an identity you can attach something to it.

That something is an inscription: an image, text, code, anything. It sits in the witness data that SegWit (2017) separated out and Taproot (2021) opened up, so a block can carry up to 4 MB of it. No new opcodes. No fork. No sidechain.

The part that sold me: **the file lives on the sat.** Most NFTs point to a server or an IPFS link that can disappear. An inscription is the data itself, on Bitcoin, for as long as Bitcoin runs.

The numbering also creates its own rarity without anyone designing it. The first sat of each block is uncommon, the first of each difficulty adjustment is rare, the first of each halving is epic. Scarcity comes from time, not from a mint script.

## How it moved, fast

- **Dec 2022.** Inscription #0, a black-and-white skull.
- **21 Jan 2023.** Rodarmor launches the protocol publicly. Running a full node and a command line is the only way in.
- **Feb 2023.** From 1,000 to 100,000 inscriptions in under a month.
- **8 Mar 2023.** An anonymous dev called domo writes BRC-20 using plain JSON. The first token, ORDI, goes live and calls itself an experiment.
- **Mar 2023.** Magic Eden opens Ordinals trading. Now normal people can buy.
- **Jun 2023.** Recursive inscriptions: one inscription can call another, so you can build things bigger than a block.
- **20 Apr 2024.** The fourth halving, block 840,000, and Runes launches on the same block. On 23 April the network does a record 926,000 transactions.
- **Jun 2025.** Over 65 million inscriptions and more than $458 million paid to miners in fees.

## What I saw from inside

At Numad Labs I owned brand, story and community for **Satoshi Punks**, one of the first Ordinals collections out of Mongolia. 100 punks, inscribed between #36151 and #73597. It sold out, the top sale was $13,500, and it did 8 BTC in volume. The X account passed 30,000 followers on the strength of those faces.

![Satoshi Punks](/img/ordinals/satoshi-wall.jpg)

Then **Pepepunks**: 1,350 pieces on cursed and recursive inscriptions and rare sats. It sold out in two hours. My job was making "normal vs cursed" readable in one second on a phone screen.

What I learned from both:

> On Bitcoin, the number is part of the art.

Collectors cared about inscription numbers the way people care about serial numbers. Sub-10k and sub-1k inscriptions traded at a premium for no other reason than being early. You don't design that. You tell the story around it.

The crowd was different too. Early on it was Bitcoiners who were curious, plus Ethereum collectors who were tired of broken links. They held longer. The culture leaned toward keeping, not flipping, which fits Bitcoin.

![Pepepunks, cursed side](/img/ordinals/pepe-cursed-wall.jpg)

## The fight it started

Not everyone was happy. Luke Dashjr pushed to have Ordinals tagged as a vulnerability (CVE-2023-50428). Plenty of loud voices called it spam. At Bitcoin Miami in May 2023, Udi Wertheimer and Eric Wall showed up to the debate dressed as Taproot Wizards. "Wizards vs laser eyes" became the shorthand for the split.

I understand both sides. Blocks did get heavier: peaks near 4 MB instead of the usual ~1.2 MB, and fees went up for everyone. But nobody broke a rule. Ordinals used the block space that the protocol already allowed, and paid for it at market price. That is how Bitcoin is supposed to settle arguments.

## Tokens: BRC-20, then Runes

BRC-20 proved people wanted tokens on Bitcoin. It also proved JSON in inscriptions is a messy way to do it. Every transfer takes extra transactions, leaves dust UTXOs behind, and depends on off-chain indexers agreeing with each other.

Runes is Rodarmor's fix, framed as "harm reduction." Token data rides in an OP_RETURN, transfers are one transaction, and it works with Bitcoin's UTXO model instead of around it. DOG•GO•TO•THE•MOON showed the market agreed.

## The tools grew up

In 2023 you needed a node. By 2025 you need a browser.

- **Wallets:** Xverse, UniSat and Magic Eden all handle Ordinals, Runes and rare sats, each with its own idea of how addresses should work.
- **Marketplaces:** Magic Eden took most of the volume with PSBT-based trading, so nobody has to hand over custody.
- **Indexers:** Hiro, Ordiscan and UniSat. They are also the weak point.

## What still breaks

**Indexers.** Ordinals and BRC-20 balances only exist because indexers say they do. When two indexers disagree, users get two answers. That is a centralisation problem inside a decentralised system, and it is the one I'd fix first.

**Block space politics.** Bitcoin Core keeps tightening what it relays. Builders keep finding the edges. This isn't going away.

**Hype vs utility.** A lot of 2023 and 2024 was speculation. Daily inscriptions now run around a thousand, which is quieter but steadier. I think that is healthy.

## Where I think it goes

The interesting work is no longer "can we put a JPEG on Bitcoin." It is:

- **Recursion** for games and generative art that build on what is already inscribed.
- **Layer 2s and Bitcoin L2 marketplaces** for anything that needs speed. I'm biased here because I worked on Mintpark, but cheap fast trading with Bitcoin settlement is the obvious next step.
- **Smart-contract experiments** like Alkanes, and the push for OP_CAT, if Bitcoin decides it wants them.

My view after two years in it: Ordinals didn't turn Bitcoin into Ethereum, and that's the point. They showed that the most conservative chain can still surprise people, as long as builders work inside its rules.

The most permanent canvas on the internet turned out to be the one nobody expected.
