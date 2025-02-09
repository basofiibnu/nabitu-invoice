# Nabitu Invoice 🧂

A web-based invoicing system built with **Next.js** and **Supabase**, designed to streamline invoice management.

## 🚀 Features
- Create, update, and delete invoices securely with **Row-Level Security (RLS)**
- Uses **Supabase** as a backend database with PostgreSQL
- Authentication via Supabase Auth (supports OAuth and email-based login)
- **Next.js App Router** structure (`src/app`) for scalability
- Tailwind CSS for styling
- API routes for data fetching and actions

---

## 🛠 Setup Instructions

### **1. Clone the Repository**
```sh
git clone https://github.com/basofiibnu/nabitu-invoice.git
cd nabitu-invoice
```

### **2. Install Dependencies**
```sh
npm install
# or
yarn install
```

### **3. Setup Environment Variables**
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_API_KEY=your_supabase_api_key
```
Replace `your_supabase_url` and `your_supabase_api_key` with your actual Supabase project credentials.

### **4. Run the Development Server**
```sh
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Technical Decisions

### **1. Why Next.js?**
- **Server-side rendering (SSR) & Static Site Generation (SSG)** for optimized performance.
- **App Router (`src/app`)** for better scalability and modularity.
- Built-in API routes for backend logic.

### **2. Why Supabase?**
- PostgreSQL database with **Row-Level Security (RLS)**
- **Auth integration** with OAuth providers
- Real-time capabilities via Postgres **listeners**

### **3. Why Tailwind CSS?**
- Utility-first styling for rapid UI development
- Lightweight and highly customizable

### **4. Why TanStack React Query?**
- Efficient data fetching, caching, and synchronization.
- Reduces unnecessary API calls, improving performance.
- Simplifies state management for async operations.

### **5. Why Zod?**
- Provides runtime validation for form inputs and API responses.
- Ensures type safety and prevents invalid data from being processed.
- Works well with TypeScript to enforce data correctness.

### **6. Why React Hook Form?**
- Optimized form handling with minimal re-renders.
- Built-in validation support, reducing boilerplate code.
- Seamlessly integrates with **Zod** for schema validation.

### **7. Security Considerations**
- **Row-Level Security (RLS)** ensures that users can only modify their own invoices.
- API calls are authenticated using Supabase Auth.

---

## 🐝 API Endpoints (Example)
### **Fetch All Invoices**
```ts
const { data, error } = await supabase
  .from('invoices')
  .select('*');
```

### **Create an Invoice**
```ts
const { data, error } = await supabase
  .from('invoices')
  .insert([{ name: "New Invoice", amount: 1000 }]);
```

---

## 🛠 Future Improvements
- Role-based access control (RBAC)
- Webhooks for external integrations
- Improved invoice filtering & search functionality

---

## 🤝 Contributing
Feel free to submit a pull request or open an issue if you have suggestions!

---

## 📚 License
This project is open-source under the **MIT License**.
