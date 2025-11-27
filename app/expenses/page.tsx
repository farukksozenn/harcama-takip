import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export default async function ExpensesPage() {
  const expenses = await prisma.expense.findMany({
    orderBy: {date: "desc"},
  });
  async function addExpense(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const category = (formData.get("category") as string) || "Genel";

    if(!title || isNaN(amount)) return;
    await prisma.expense.create({
      data: {
        title,
        amount,
        category,
      },
    });
    revalidatePath("/expenses");
  }

  const kategoriler = ["Market", "Kira", "Fatura", "Eğitim", "Genel"]
  const grouped = kategoriler.map((kat) => ({
    name: kat,
    items: expenses.filter((e) => e.category === kat),
  }));

  return (
    <main className="page">
      <h1>Harcama Takip</h1>  
      
      <form action={addExpense} className="expense-form">
        <input type="text" name="title" placeholder="Harcama açıklaması" required />
        <input type="number" step="0.01" name="amount" placeholder="Tutar (USD)" required />
        <select name="category" required>
          <option value="">Kategori Seç:</option>
          {kategoriler.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <button type="submit">Ekle</button>
      </form>

      <div className="category-container">
        {grouped.map((gr) => (
          <div key={gr.name} className={`category-box ${gr.name.toLowerCase()}`}>
            <h2>{gr.name}</h2>
            {gr.items.length === 0 ? (
              <p style={{ opacity: 0.6, fontStyle: "italic" }}>Henüz veri yok</p>
            ) : (
              gr.items.map((exp) => (
                <div key={exp.id} className="expense-item">
                  {exp.title} – {exp.amount}$ –{" "}
                  {new Date(exp.date).toLocaleDateString("tr-TR")}
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </main>
  );
}