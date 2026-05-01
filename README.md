# Swiggy Voice Copilot

A WhatsApp-first conversational AI copilot that enables users to discover and order food, groceries, and dining experiences from Swiggy using voice or natural language.

---

## Overview

Swiggy Voice Copilot reduces ordering friction by replacing browsing-heavy flows with a simple conversational interface accessible directly within WhatsApp. 

With over 500 million active WhatsApp users in India, this integration completely removes the barrier of application installation and navigation. Instead of browsing complex menus, users can express their intent directly in their everyday chat application:
> "cheap veg dinner"
> "get me milk, eggs, and bread"
> "book a table for 2 tonight"

---

## Problem Statement

- Users often spend several minutes browsing before making a purchase.
- High decision fatigue can lead to user drop-offs.
- Non-technical and elderly users struggle with traditional application navigation but are highly comfortable using WhatsApp.
- App-fatigue prevents occasional users from installing or keeping the native Swiggy application.

---

## Solution

A WhatsApp-based AI copilot interface that:
- Resides natively within WhatsApp, maximizing reach and accessibility.
- Understands user intent via voice notes or text input.
- Fetches and processes results in real-time.
- Returns ranked, decision-ready options to streamline the process.
- Enables low-friction, intuitive ordering flows directly in the chat.

---

## Key Features

- **WhatsApp Native Interface**: Accessible without app installation.
- **Voice and Text Input**: Seamlessly process natural language and voice notes.
- **Intent Parsing**: Intelligently capture budget, cuisine, and dietary preferences.
- **Ranked Recommendations**: Curate the top 3 optimal options to prevent choice paralysis.
- **Order Replication**: Provide a fast "repeat last order" sequence.
- **Instamart Simulation**: Streamlined grocery cart capabilities.
- **Dineout Simulation**: Table discovery and reservation assistance.

---

## Architecture

```text
User (WhatsApp Voice/Text)
↓
WhatsApp Business API
↓
Backend (Node.js)
↓
Intent Parser
↓
Swiggy APIs (Food / Instamart / Dineout)
↓
Ranked Response via WhatsApp
```

---

## Technology Stack

- **Backend**: Node.js, Express
- **Integration Layer**: WhatsApp Business API (Target)
- **Data Layer**: JSON Mock Dataset (Simulating Swiggy APIs)

---

## Compliance and Safety

- **Data Integrity**: No scraping or unauthorized external data extraction.
- **Pricing Accuracy**: No hallucination; all values are strictly derived from the provided dataset.
- **Attribution**: Clear indications where content is powered by Swiggy.
- **Privacy**: Strict adherence to data privacy; no storage of sensitive user information.

---

## Future Scope

- Full integration with the official Swiggy MCP APIs.
- Official deployment on the WhatsApp Business API.
- Live order placement and UPI payment gateway integration within WhatsApp.
- Intelligent personalization using user order history.
- Multilingual natural language support to serve diverse demographics.

---

## Author

Vishnu K
