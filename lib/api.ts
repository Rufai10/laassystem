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
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
}

// 3. Helista Reports
export async function fetchReports() {
  const response = await fetch(`${BASE_URL}/reports`);
  return await response.json();
}

// 4. Helista Leads
export async function fetchLeads() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/leads`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch leads");
  return await response.json();
}

// 4.1 Helista Customers
export async function fetchCustomers() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/leads/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch customers");
  return await response.json();
}

// 5. Create Lead
export async function createLead(leadData: any) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create lead");
  }
  return await response.json();
}

/**
 * Update an existing lead (e.g., status, value, company)
 */
export async function updateLead(id: string, leadData: any) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update lead");
  }
  return await response.json();
}

/**
 * Delete a user (Admin only)
 */
export async function deleteUser(id: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete user");
  }
  return await response.json();
}

/**
 * Register a new user / team member
 */
export async function registerUser(userData: any) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to register user");
  }
  return await response.json();
}

/**
 * Login API
 */
export async function login(credentials: any) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Invalid credentials");
  }
  return await response.json();
}
