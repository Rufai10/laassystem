/**
 * Central API Management
 * 
 * Sxb, halkan ku dhex qor dhamaan "Fetch Requests-ka" aad u dirayso Backend-kaaga.
 * Tani waxay kuu fududaynaysaa in haddii aad badeshay URL-ka Backend-ka aad hal meel ka bedesho.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// 1. Helista Finance Stats
export async function fetchFinanceStats() {
  try {
    const response = await fetch(`${BASE_URL}/finance/stats`);
    if (!response.ok) throw new Error("Xogta Finance-ka waa la waayay");
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

// 2. Helista Users
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  return await response.json();
}

// 3. Helista Reports
export async function fetchReports() {
  const response = await fetch(`${BASE_URL}/reports`);
  return await response.json();
}
