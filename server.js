const express = require("express");
const foodItems = require("./data");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let session = {
  state: 'IDLE', // States: IDLE, AWAITING_MAIN_MENU, SEARCHING, AWAITING_SELECTION, AWAITING_QUANTITY, AWAITING_ANYTHING_ELSE, AWAITING_ADDRESS, AWAITING_PAYMENT
  lastResults: [],
  selectedItem: null,
  cart: [],
  address: null,
  payment: null
};

function parseIntent(query) {
  let q = query.toLowerCase();

  let budget = q.includes("cheap") ? 150 : null;
  let type = q.includes("veg") && !q.includes("non-veg") ? "veg" : null;

  // Filter based on keywords
  let keywords = ["biryani", "chinese", "roll", "rice", "pizza", "burger", "chicken", "paneer", "dessert", "sweet", "snack", "jamun", "brownie", "rasmalai"];
  let matchedKeyword = keywords.find(k => q.includes(k));

  return { budget, type, matchedKeyword };
}

function getResults(intent) {
  // If no intent criteria matches at all, return null to prompt the user clearly
  if (!intent.budget && !intent.type && !intent.matchedKeyword) {
    return null; 
  }

  let results = foodItems;

  if (intent.type) {
    results = results.filter(f => f.type === intent.type);
  }

  if (intent.budget) {
    results = results.filter(f => f.price <= intent.budget);
  }

  if (intent.matchedKeyword) {
    // some keywords might not be in the exact name, so we check for broader categories if needed
    if (intent.matchedKeyword === "dessert" || intent.matchedKeyword === "sweet") {
      results = results.filter(f => ["Gulab Jamun (2 pcs)", "Chocolate Brownie", "Rasmalai"].includes(f.name));
    } else if (intent.matchedKeyword === "snack") {
      results = results.filter(f => ["Veg Burger", "Chicken Burger", "French Fries"].includes(f.name));
    } else {
      results = results.filter(f => f.name.toLowerCase().includes(intent.matchedKeyword));
    }
  }

  return results.sort((a, b) => a.price - b.price).slice(0, 3);
}

function resetSession() {
  session = {
    state: 'IDLE',
    lastResults: [],
    selectedItem: null,
    cart: [],
    address: null,
    payment: null
  };
}

const mainMenuText = `👋 **Welcome to Swiggy Copilot!**\n\nHow can I help you today?\n\n1. Order Food\n2. Track Order\n3. Cancel Existing Order\n4. Exit`;

app.post("/chat", (req, res) => {
  const { message } = req.body;
  const msgLower = message.toLowerCase().trim();

  // Handle global resets
  if (msgLower === "cancel" || msgLower === "restart" || msgLower === "clear") {
    resetSession();
    return res.json({ reply: `Session restarted.\n\n${mainMenuText}` });
  }

  // State Machine
  switch (session.state) {

    case 'IDLE': {
      session.state = 'AWAITING_MAIN_MENU';
      return res.json({ reply: mainMenuText });
    }

    case 'AWAITING_MAIN_MENU': {
      if (msgLower === "1" || msgLower.includes("order")) {
        session.state = 'SEARCHING';
        return res.json({ reply: "Great! What are you craving today? (e.g., 'biryani', 'cheap veg', 'dessert')" });
      } else if (msgLower === "2" || msgLower.includes("track")) {
        resetSession();
        return res.json({ reply: "📍 **Tracking Mock Order**\nYour food is out for delivery and will arrive in 15 minutes! 🚀\n\n*(Type 'hello' to start again)*" });
      } else if (msgLower === "3" || msgLower.includes("cancel existing")) {
        resetSession();
        return res.json({ reply: "✅ **Order Cancelled**\nYour mock order has been successfully cancelled.\n\n*(Type 'hello' to start again)*" });
      } else if (msgLower === "4" || msgLower.includes("exit")) {
        resetSession();
        return res.json({ reply: "Goodbye! Have a great day! 👋\n\n*(Type 'hello' to start again)*" });
      } else {
        return res.json({ reply: "Please reply with 1, 2, 3, or 4.\n\n" + mainMenuText });
      }
    }

    case 'SEARCHING': {
      const intent = parseIntent(message);
      const results = getResults(intent);

      if (!results || !results.length) {
        return res.json({ reply: "Sorry, I didn't quite catch that. Try asking for things like 'biryani', 'desserts', 'veg food', or 'something cheap'." });
      }

      session.lastResults = results;
      session.state = 'AWAITING_SELECTION';

      const text = results.map((r, i) =>
        `${i + 1}. **${r.name}** - ₹${r.price} - ${r.eta} mins`
      ).join("\n");

      return res.json({
        reply: `🍽️ **Here are some options:**\n\n${text}\n\nReply with 1, 2, or 3 to select.`
      });
    }

    case 'AWAITING_SELECTION': {
      const choice = parseInt(msgLower.replace(/[^\d]/g, ''));
      
      if (isNaN(choice) || choice < 1 || choice > session.lastResults.length) {
        return res.json({ reply: "Please reply with a valid option number (1, 2, or 3)." });
      }

      session.selectedItem = session.lastResults[choice - 1];
      session.state = 'AWAITING_QUANTITY';

      return res.json({
        reply: `Great choice! You selected **${session.selectedItem.name}**.\n\nHow many would you like? (e.g., 1, 2)`
      });
    }

    case 'AWAITING_QUANTITY': {
      let qty = parseInt(msgLower.replace(/[^\d]/g, ''));
      
      if (msgLower.includes("one")) qty = 1;
      else if (msgLower.includes("two")) qty = 2;
      else if (msgLower.includes("three")) qty = 3;

      if (isNaN(qty) || qty < 1) {
        return res.json({ reply: "I didn't catch the quantity. Please enter a number (e.g., 1)." });
      }

      session.cart.push({ item: session.selectedItem, quantity: qty });
      session.state = 'AWAITING_ANYTHING_ELSE';

      return res.json({
        reply: `Added **${qty} x ${session.selectedItem.name}** to your cart.\n\nDo you want to add anything else? (Yes/No)`
      });
    }

    case 'AWAITING_ANYTHING_ELSE': {
      if (msgLower.includes("yes") || msgLower.includes("yup") || msgLower.includes("sure") || msgLower.includes("yeah")) {
        session.state = 'SEARCHING';
        return res.json({ reply: "Awesome! What else are you craving?" });
      } else if (msgLower.includes("no") || msgLower.includes("nope") || msgLower.includes("nah") || msgLower.includes("checkout")) {
        session.state = 'AWAITING_ADDRESS';
        return res.json({
          reply: `Let's proceed to checkout.\n\nWhere should we deliver this?\n\n1. Home\n2. Office\n3. Son's Home\n4. Share Current Location / Add New Address`
        });
      } else {
        return res.json({ reply: "Please reply with Yes or No." });
      }
    }

    case 'AWAITING_ADDRESS': {
      let addr = null;
      if (msgLower.includes("1") || msgLower.includes("home")) addr = "Home";
      else if (msgLower.includes("2") || msgLower.includes("office")) addr = "Office";
      else if (msgLower.includes("3") || msgLower.includes("son")) addr = "Son's Home";
      else if (msgLower.includes("4") || msgLower.includes("location") || msgLower.includes("new")) addr = "Current Location";

      if (!addr) {
        if (msgLower.length > 5) {
          addr = message;
        } else {
          return res.json({ reply: "Please select an address option (1/2/3/4) or type a new address." });
        }
      }

      session.address = addr;
      session.state = 'AWAITING_PAYMENT';

      const cartTotal = session.cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

      return res.json({
        reply: `Address confirmed: **${session.address}**.\n\nYour total is **₹${cartTotal}**.\n\nHow would you like to pay?\n\n1. UPI\n2. Swiggy Wallet\n3. Cash on Delivery (COD)`
      });
    }

    case 'AWAITING_PAYMENT': {
      let pay = null;
      if (msgLower.includes("1") || msgLower.includes("upi")) pay = "UPI";
      else if (msgLower.includes("2") || msgLower.includes("wallet") || msgLower.includes("swiggy")) pay = "Swiggy Wallet";
      else if (msgLower.includes("3") || msgLower.includes("cash") || msgLower.includes("cod")) pay = "Cash on Delivery";

      if (!pay) {
        return res.json({ reply: "Please select a payment method (1 for UPI, 2 for Wallet, 3 for COD)." });
      }

      session.payment = pay;

      const orderSummary = session.cart.map(c => `${c.quantity}x ${c.item.name}`).join(", ");
      const cartTotal = session.cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

      const finalReply = `✅ **Order Confirmed!**\n\n**Items:** ${orderSummary}\n**Total:** ₹${cartTotal}\n**Payment:** ${session.payment}\n**Delivering to:** ${session.address}\n\nYour food will arrive soon! 🚀\n\n*(Type 'hello' to start a new order)*`;
      
      resetSession();

      return res.json({ reply: finalReply });
    }

    default:
      resetSession();
      return res.json({ reply: "Something went wrong. Session restarted.\n\n" + mainMenuText });
  }
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
