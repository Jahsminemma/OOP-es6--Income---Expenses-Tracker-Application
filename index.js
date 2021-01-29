
//IncomeTracker class
class Income {
    constructor(amount, incomeSource) {
        this.amount = amount,
            this.incomeSource = incomeSource
    }
}
//expenses tracker class
class Expenses {
    constructor(amount, expenseReason) {
        this.amount = amount,
            this.expenseReason = expenseReason
    }
}
//updateUI class
class updateUI {
    static displayIncomeAndExpenses() {

        let storedIncome = [
            { incomeSource: "Salary", amount: "2000" },
            { incomeSource: "Loan", amount: "40000" },
            { incomeSource: "freelance job", amount: "300" }
        ]

        let storedExpenses = [
            { expenseReason: "Shopping", amount: "2000" },
            { expenseReason: "Rent Bill", amount: "40000" },
            { expenseReason: "Janitors salary", amount: "300" }
        ]

        const incomes = storedIncome
        const expenses = storedExpenses;
        let totalIncome = 0
        for (let i = 0; i < incomes.length; i++){
            totalIncome += +incomes[i].amount
        }
        console.log(totalIncome)

        incomes.forEach((income) => updateUI.addIncomeToList(income))
        expenses.forEach((expense) => updateUI.addExpensesToList(expense))
    }

    static addIncomeToList(income) {
        const incomeList = document.querySelector(".income-list");
        const tableRow = document.createElement("tr");
        tableRow.style.boxShadow = "1px 1px 2px grey";
        tableRow.classList.add("border")
        tableRow.innerHTML = `
            <td >${income.incomeSource}</td>
            <td class = "text-success"> $<span class="income-amount">${income.amount}</span></td>
        `
        incomeList.appendChild(tableRow)
    }

    static addExpensesToList(expense) {
        const expensesList = document.querySelector(".expenses-list");
        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `
            <td scope="col">${expense.expenseReason}</td>
            <td class="text-danger" scope="col">$<span class="expense-amount">${expense.amount}</span></td>
        `
        expensesList.appendChild(tableRow)
    }

    static clearField() {
        document.querySelector("#income").value = ""
        document.querySelector("#income-source").value = ""
        document.querySelector("#expense").value = ""
        document.querySelector("#expense-reason").value = ""
    }

    static showAlert(message, element, bgColor) {
        const container = document.querySelector(element)
        const div = document.createElement("div")
        div.classList.add("col-12")
        div.classList.add(bgColor)
        div.classList.add("alert")

        div.innerHTML = `<h5 class="text-white">${message}</h5>`
        container.prepend(div);

        //remove the div in 3s
        setTimeout(() => document.querySelector(".alert").remove(), 3000)

    }
    static showSection(element, container) {
        const icon = document.querySelector(element)
        icon.addEventListener("click", () => {
        document.querySelector(container).classList.add("active")
        })
      }

    static hideSection(element, container) {
        const icon = document.querySelector(element)
        icon.addEventListener("click", () => {
        document.querySelector(container).classList.remove("active")
        })
      }
    }
    

//Event to display incomes
document.addEventListener("DOMContentLoaded", updateUI.displayIncomeAndExpenses())

//event to add income to list on for submission
document.querySelector(".income-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = document.querySelector("#income").value
    const incomeSource = document.querySelector("#income-source").value

    //instantiate new Income

    const income = new Income(amount, incomeSource)

    //add income to list
    updateUI.addIncomeToList(income)

    // clear form value field

    updateUI.clearField()
    //show alert
    updateUI.showAlert(`$${amount} credited`, ".income-form", "bg-success")
})

//event to add expenses
document.querySelector(".expenses-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = document.querySelector("#expense").value
    const expenseReason = document.querySelector("#expense-reason").value

    //instantiate new Income

    const expense = new Expenses(amount, expenseReason)

    //add income to list
    updateUI.addExpensesToList(expense)

    //clear fields 
    updateUI.clearField()

    //show alert
    updateUI.showAlert(`$${amount} Debited`, ".expenses-form", "bg-danger")
})

//hide section

updateUI.hideSection(".expense-cancel .fa-times-circle", ".expense-container")
updateUI.hideSection(".income-cancel .fa-times-circle", ".income-container")

//show section
updateUI.showSection(".debit-btn", ".expense-container")
updateUI.showSection(".credit-btn", ".income-container")


//canvasjs chart
window.onload = function () {

    var totalIncome = 883000;
    var incomeData = {
        "income vs Expenses": [{
            click: incomeChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "income vs Expenses",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: 519960, name: "Income", color: "#E7823A" },
                { y: 363040, name: "Expenses", color: "#546BC1" }
            ]
        }],
        "Income": [{
            color: "#c23452",
            name: "Income",
            type: "column",
            dataPoints: [
                { x: new Date("1 Jan 2015"), y: 33000 },
                { x: new Date("1 Feb 2015"), y: 35960 },
                { x: new Date("1 Mar 2015"), y: 42160 },
                { x: new Date("1 Apr 2015"), y: 42240 },
                { x: new Date("1 May 2015"), y: 43200 },
                { x: new Date("1 Jun 2015"), y: 40600 },
                { x: new Date("1 Jul 2015"), y: 42560 },
                { x: new Date("1 Aug 2015"), y: 44280 },
                { x: new Date("1 Sep 2015"), y: 44800 },
                { x: new Date("1 Oct 2015"), y: 48720 },
                { x: new Date("1 Nov 2015"), y: 50840 },
                { x: new Date("1 Dec 2015"), y: 51600 }
            ]
        }],
        "Expenses": [{
            color: "#546BC1",
            name: "Expenses",
            type: "column",
            dataPoints: [
                { x: new Date("1 Jan 2015"), y: 22000 },
                { x: new Date("1 Feb 2015"), y: 26040 },
                { x: new Date("1 Mar 2015"), y: 25840 },
                { x: new Date("1 Apr 2015"), y: 23760 },
                { x: new Date("1 May 2015"), y: 28800 },
                { x: new Date("1 Jun 2015"), y: 29400 },
                { x: new Date("1 Jul 2015"), y: 33440 },
                { x: new Date("1 Aug 2015"), y: 37720 },
                { x: new Date("1 Sep 2015"), y: 35200 },
                { x: new Date("1 Oct 2015"), y: 35280 },
                { x: new Date("1 Nov 2015"), y: 31160 },
                { x: new Date("1 Dec 2015"), y: 34400 }
            ]
        }]
    };

    var incomeVsExpensesOptions = {
        animationEnabled: true,
        theme: "light2",

        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalIncome * 100) + "%";
            }
        },
        data: []
    };

    var incomeDrilldownedChartOptions = {
        animationEnabled: true,
        theme: "light2",
        axisX: {
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2"
        },
        axisY: {
            gridThickness: 0,
            includeZero: false,
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2",
            lineThickness: 1
        },
        data: []
    };

    var chart = new CanvasJS.Chart("chartContainer", incomeVsExpensesOptions);
    chart.options.data = incomeData["income vs Expenses"];
    chart.render();

    function incomeChartDrilldownHandler(e) {
        chart = new CanvasJS.Chart("chartContainer", incomeDrilldownedChartOptions);
        chart.options.data = incomeData[e.dataPoint.name];
        chart.options.title = { text: e.dataPoint.name }
        chart.render();
    }
}