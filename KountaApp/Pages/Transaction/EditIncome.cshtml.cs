using KountaApp.Areas.Identity.Data;
using KountaApp.Areas.Identity.View_Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace KountaApp.Pages.Transaction
{
    public class EditIncomeModel : PageModel
    {
        private readonly KountaDbContext kountaDbContext;

        [BindProperty]
        public EditIncome EditIncome { get; set; }

        public EditIncomeModel(KountaDbContext kountaDbContext)
        {
            this.kountaDbContext = kountaDbContext;
        }
        public void OnGet(int id)
        {
            var income = kountaDbContext.Incomes.Find(id);

            if (income != null)
            {
                // convert to view model
                EditIncome = new EditIncome()
                {
                    // Map all fields from data model to view model
                    IncomeId = income.IncomeId,
                    Category = income.Category,
                    Amount = income.Amount,
                    Description = income.Description,
                    Date = income.Date,
                    // Include the fks
                    UserId = income.UserId
                };
            }


        }
        public void OnPostUpdate()
        {
            if (EditIncome != null)
            {
                var existingIncome = kountaDbContext.Incomes.Find(EditIncome.IncomeId);

                if (existingIncome != null)
                {
                    // Convert view model back to data model
                    // Dont include any ids pks or fks



                    existingIncome.Category = EditIncome.Category;
                    existingIncome.Amount = EditIncome.Amount;
                    existingIncome.Description = EditIncome.Description;
                    existingIncome.Date = EditIncome.Date;

                    kountaDbContext.SaveChanges();

                    // Message

                    ViewData["Message"] = "Income Updated Successfully!";

                    Response.Redirect("/Transaction/ListIncome");



                }

            }
        }
        public IActionResult OnPostDelete()
        {
            // find income 
            var existingIncome = kountaDbContext.Incomes.Find(EditIncome.IncomeId);

            if (existingIncome != null)
            {
                kountaDbContext.Incomes.Remove(existingIncome);
                kountaDbContext.SaveChanges();

                return RedirectToPage("/Transaction/ListIncome");
            }

            return Page();

        }
    }
}
