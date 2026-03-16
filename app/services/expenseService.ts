import { Expense } from "../types";
import { supabase } from "./supabaseClient";
import authService from "./authService";

class ExpenseService {
  async addExpense(
    description: string,
    amount: number,
    category?: string,
    notes?: string,
  ): Promise<{ success: boolean; expense?: Expense; error?: string }> {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        return { success: false, error: "User not authenticated" };
      }

      if (!description || !amount) {
        return { success: false, error: "Description and amount are required" };
      }

      if (amount <= 0) {
        return { success: false, error: "Amount must be greater than 0" };
      }

      const { data, error } = await supabase
        .from("expenses")
        .insert({
          user_id: currentUser.id,
          description,
          amount,
          date: new Date().toISOString(),
          category: category || null,
          notes: notes || null,
        })
        .select("*")
        .single();

      if (error || !data) {
        return {
          success: false,
          error: error?.message || "Failed to add expense",
        };
      }

      const expense: Expense = {
        id: data.id,
        description: data.description,
        amount: data.amount,
        date: new Date(data.date),
        category: data.category ?? undefined,
        notes: data.notes ?? undefined,
      };

      return { success: true, expense };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to add expense",
      };
    }
  }

  async getExpenses(): Promise<Expense[]> {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        return [];
      }

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("date", { ascending: false });

      if (error || !data) {
        console.error("Error fetching expenses:", error);
        return [];
      }

      return data.map((e: any) => ({
        id: e.id,
        description: e.description,
        amount: e.amount,
        date: new Date(e.date),
        category: e.category ?? undefined,
        notes: e.notes ?? undefined,
      }));
    } catch (error) {
      console.error("Error fetching expenses:", error);
      return [];
    }
  }

  async deleteExpense(
    id: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        return { success: false, error: "User not authenticated" };
      }

      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", currentUser.id);

      if (error) {
        return {
          success: false,
          error: error.message || "Failed to delete expense",
        };
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to delete expense",
      };
    }
  }

  async updateExpense(
    id: string,
    updates: Partial<Expense>,
  ): Promise<{ success: boolean; expense?: Expense; error?: string }> {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        return { success: false, error: "User not authenticated" };
      }

      const { data, error } = await supabase
        .from("expenses")
        .update({
          ...updates,
          date: updates.date ? (updates.date as Date).toISOString() : undefined,
        })
        .eq("id", id)
        .eq("user_id", currentUser.id)
        .select("*")
        .single();

      if (error || !data) {
        return {
          success: false,
          error: error?.message || "Failed to update expense",
        };
      }

      const expense: Expense = {
        id: data.id,
        description: data.description,
        amount: data.amount,
        date: new Date(data.date),
        category: data.category ?? undefined,
        notes: data.notes ?? undefined,
      };

      return { success: true, expense };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to update expense",
      };
    }
  }

  async getTotalExpenses(): Promise<number> {
    const expenses = await this.getExpenses();
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  async getMonthlyExpenses(month: number, year: number): Promise<Expense[]> {
    const expenses = await this.getExpenses();
    return expenses.filter((e) => {
      const eDate = new Date(e.date);
      return eDate.getMonth() === month && eDate.getFullYear() === year;
    });
  }

  async getCategoryBreakdown(): Promise<Record<string, number>> {
    const expenses = await this.getExpenses();
    const breakdown: Record<string, number> = {};

    expenses.forEach((e) => {
      const category = e.category || "Uncategorized";
      breakdown[category] = (breakdown[category] || 0) + e.amount;
    });

    return breakdown;
  }

  async searchExpenses(query: string): Promise<Expense[]> {
    const expenses = await this.getExpenses();
    const lowerQuery = query.toLowerCase();
    return expenses.filter(
      (e) =>
        e.description.toLowerCase().includes(lowerQuery) ||
        e.notes?.toLowerCase().includes(lowerQuery),
    );
  }

  async clearAllExpenses(): Promise<boolean> {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) return false;

      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("user_id", currentUser.id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error clearing expenses:", error);
      return false;
    }
  }
}

export default new ExpenseService();
