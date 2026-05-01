# 🚀 Swiggy Voice Copilot

A conversational AI copilot that enables users to discover and order food, groceries, and dining experiences from Swiggy using **voice or natural language**.

---

## 💡 Overview

Swiggy Voice Copilot reduces ordering friction by replacing browsing-heavy flows with a simple conversational interface.

Instead of navigating menus, users can simply say:
> “cheap veg dinner”  
> “get me milk, eggs, and bread”  
> “book a table for 2 tonight”

---

## 🎯 Problem

- Users spend **2–5 minutes** browsing before ordering  
- High **decision fatigue → drop-offs**  
- Non-tech users and older users struggle with app navigation  

---

## ⚡ Solution

A WhatsApp-style AI copilot that:
- Understands user intent (voice/text)
- Fetches real-time results (simulated)
- Returns **ranked, decision-ready options**
- Enables **low-friction ordering flows**

---

## 🔥 Features

- 🎤 Voice + text input  
- 🧠 Intent parsing (budget, cuisine, preferences)  
- ⚡ Top 3 ranked recommendations  
- 🔁 “Repeat last order” flow  
- 🛒 Instamart-style grocery cart simulation  
- 🍽️ Dineout-style table discovery simulation  
- 💬 Conversational UX (WhatsApp-like)

---

## 🏗️ Architecture

```text
User (Voice/Text)
↓
Frontend (Chat UI)
↓
Backend (Node.js)
↓
Intent Parser
↓
Mock Swiggy APIs (Food / Instamart / Dineout)
↓
Ranked Response
```

---

## 🧪 Demo Flows

### 1. Food Ordering
> “cheap veg dinner” → top 3 options

### 2. Repeat Order
> “same as yesterday” → instant reorder

### 3. Instamart
> “milk, eggs, bread” → auto cart

### 4. Dineout
> “table for 2 tonight” → restaurant suggestions

---

## ⚙️ Tech Stack

- Node.js (Express)
- Vanilla JS (Frontend)
- Browser Speech API (Voice)
- Mock dataset (simulating Swiggy APIs)

---

## 🔐 Compliance & Safety

- No scraping or external data extraction  
- No price hallucination (all values from dataset)  
- Clear attribution: “Powered by Swiggy”  
- No storage of sensitive user data  

---

## 🚀 Future Scope

- Integration with Swiggy MCP APIs  
- WhatsApp Business API deployment  
- Real-time order placement & payments  
- Personalization using user history  
- Multilingual voice support  

---

## 🎯 Vision

To transform Swiggy from a browsing-based app  
into a **conversational commerce platform**.

---

## 👤 Author

Vishnu K
