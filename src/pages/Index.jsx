import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: new Date(), amount: 100, type: "Income", category: "Nike" },
    { id: 2, date: new Date(), amount: 200, type: "Expense", category: "Adidas" },
  ]);

  const [form, setForm] = useState({
    id: null,
    date: "",
    amount: "",
    type: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === form.id ? { ...form, date: new Date(form.date) } : transaction
        )
      );
    } else {
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { ...form, id: Date.now(), date: new Date(form.date) },
      ]);
    }
    setForm({ id: null, date: "", amount: "", type: "", category: "" });
  };

  const handleEdit = (transaction) => {
    setForm({
      id: transaction.id,
      date: format(transaction.date, "yyyy-MM-dd"),
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
    });
  };

  const handleDelete = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Sneaker Accounting App</h1>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add / Edit Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Date"
              required
            />
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
            />
            <Select
              name="type"
              value={form.type}
              onValueChange={(value) => handleSelectChange("type", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select
              name="category"
              value={form.category}
              onValueChange={(value) => handleSelectChange("category", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
                <SelectItem value="Reebok">Reebok</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full">
              {form.id ? "Update Transaction" : "Add Transaction"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(transaction.date, "yyyy-MM-dd")}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(transaction)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;