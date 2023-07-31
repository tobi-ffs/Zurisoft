using KountaApp.Areas.Identity.Data;
using KountaApp.Areas.Identity.View_Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace KountaApp.Pages.Employee
{
    public class EditSalaryModel : PageModel
    {
        private readonly KountaDbContext kountaDbContext;

        [BindProperty]
        public EditSalary EditSalary { get; set; }

        public EditSalaryModel(KountaDbContext kountaDbContext)
        {
            this.kountaDbContext = kountaDbContext;
        }
        public void OnGet(int id)
        {
            var salary = kountaDbContext.Salaries.Find(id);

            if (salary != null)
            {
                // convert to view model
                EditSalary = new EditSalary()
                {
                    // Map all fields from data model to view model
                    SalaryId = salary.SalaryId,
                    PayDate = salary.PayDate,
                    Wage = salary.Wage,
                    EmployeeId = salary.EmployeeId,
                    UserId = salary.UserId
                };
            }


        }
        public void OnPostUpdate()
        {
            if (EditSalary != null)
            {
                var existingSalary = kountaDbContext.Salaries.Find(EditSalary.SalaryId);

                if (existingSalary != null)
                {
                    // Convert view model back to data model
                    // Dont include any ids pks or fks



                    existingSalary.PayDate = EditSalary.PayDate;
                    existingSalary.Wage = EditSalary.Wage;
                    kountaDbContext.SaveChanges();

                    // Message

                   // ViewData["Message"] = "Salary Updated Successfully!";

                    Response.Redirect("/Employee/PaySlip");



                }

            }
        }
        public IActionResult OnPostDelete()
        {
            // find employee 
            var existingSalary = kountaDbContext.Salaries.Find(EditSalary.SalaryId);

            if (existingSalary != null)
            {
                kountaDbContext.Salaries.Remove(existingSalary);
                kountaDbContext.SaveChanges();

                return RedirectToPage("/Employee/PaySlip");
            }

            return Page();

        }
    }
}
