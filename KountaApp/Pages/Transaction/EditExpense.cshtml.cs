using KountaApp.Areas.Identity.Data;
using KountaApp.Areas.Identity.View_Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace KountaApp.Pages.Transaction
{
    public class EditExpenseModel : PageModel
    {
        private readonly KountaDbContext kountaDbContext;

        [BindProperty]
        public EditExpense EditExpense { get; set; }

        public EditExpenseModel(KountaDbContext kountaDbContext)
        {
            this.kountaDbContext = kountaDbContext;
        }
        public void OnGet(int id)
        {
            var expense = kountaDbContext.Expenses.Find(id);

            if (expense != null)
            {
                // convert to view model
                EditExpense = new EditExpense()
                {
                    // Map all fields from data model to view model
                    ExpenseId = expense.ExpenseId,
                    Category = expense.Category,
                    Amount = expense.Amount,
                    Description = expense.Description,
                    Date = expense.Date,
                    // Include the fks
                    UserId = expense.UserId
                };
            }


        }
        public void OnPostUpdate()
        {
            if (EditExpense != null)
            {
                var existingExpense = kountaDbContext.Expenses.Find(EditExpense.ExpenseId);

                if (existingExpense != null)
                {
                    // Convert view model back to data model
                    // Dont include any ids pks or fks



                    existingExpense.Category = EditExpense.Category;
                    existingExpense.Amount = EditExpense.Amount;
                    existingExpense.Description = EditExpense.Description;
                    existingExpense.Date = EditExpense.Date;

                    kountaDbContext.SaveChanges();

                    // Message

                    ViewData["Message"] = "Expense Updated Successfully!";

                    Response.Redirect("/Transaction/ListExpense");



                }

            }
        }
        public IActionResult OnPostDelete()
        {
            // find expense 
            var existingExpense = kountaDbContext.Expenses.Find(EditExpense.ExpenseId);

            if (existingExpense != null)
            {
                kountaDbContext.Expenses.Remove(existingExpense);
                kountaDbContext.SaveChanges();

                return RedirectToPage("/Transaction/ListExpense");
            }

            return Page();

        }
    }
}
