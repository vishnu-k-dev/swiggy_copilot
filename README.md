# Swiggy Voice Copilot

A conversational AI copilot that enables users to discover and order food, groceries, and dining experiences from Swiggy using voice or natural language.

---

## Overview

Swiggy Voice Copilot reduces ordering friction by replacing browsing-heavy flows with a simple conversational interface. 

Instead of navigating complex menus, users can express their intent directly:
> "cheap veg dinner"
> "get me milk, eggs, and bread"
> "book a table for 2 tonight"

---

## Problem Statement

- Users often spend several minutes browsing before making a purchase.
- High decision fatigue can lead to user drop-offs.
- Non-technical and elderly users may struggle with traditional application navigation.

---

## Solution

A chat-based AI copilot interface that:
- Understands user intent via voice or text input.
- Fetches and processes results in real-time.
- Returns ranked, decision-ready options to streamline the process.
- Enables low-friction, intuitive ordering flows.

---

## Key Features

- **Voice and Text Input**: Seamlessly process natural language.
- **Intent Parsing**: Intelligently capture budget, cuisine, and dietary preferences.
- **Ranked Recommendations**: Curate the top 3 optimal options.
- **Order Replication**: Provide a fast "repeat last order" sequence.
- **Instamart Simulation**: Streamlined grocery cart capabilities.
- **Dineout Simulation**: Table discovery and reservation assistance.
- **Conversational UX**: State-driven messaging architecture.

---

## Architecture

```text
User (Voice/Text)
↓
Frontend (Chat UI)
↓
Backend (Node.js)
↓
Intent Parser
↓
Swiggy APIs (Food / Instamart / Dineout)
↓
Ranked Response
```

---

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: Vanilla JavaScript
- **Voice Integration**: Browser Speech API
- **Data Layer**: JSON Mock Dataset

---

## Compliance and Safety

- **Data Integrity**: No scraping or unauthorized external data extraction.
- **Pricing Accuracy**: No hallucination; all values are strictly derived from the provided dataset.
- **Attribution**: Clear indications where content is powered by Swiggy.
- **Privacy**: Strict adherence to data privacy; no storage of sensitive user information.

---

## Future Scope

- Integration with the official Swiggy MCP APIs.
- Deployment on the WhatsApp Business API.
- Live order placement and payment gateway integration.
- Intelligent personalization using user order history.
- Multilingual natural language support.

---

## Author

Vishnu K
