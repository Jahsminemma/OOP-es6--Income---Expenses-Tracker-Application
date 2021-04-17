
//Tracker class
class Finance_Tracker  {
    constructor(amount, description) {
        this.amount = amount,
            this.description = description
    }
}

//updateUI class
class updateUI {
    static displayIncomeAndExpenses() {
        let storedIncome = Storage.getIncome()
        let storedExpenses = Storage.getExpenses()
        const incomes = storedIncome
        const expenses = storedExpenses;

        updateUI.updateTransaction(incomes, expenses)
        incomes.forEach((income) => updateUI.addIncomeToList(income))
        expenses.forEach((expense) => updateUI.addExpensesToList(expense))
    }
    static dynamicIncomeUpdate() {
        let storedIncome = Storage.getIncome()
        let storedExpenses = Storage.getExpenses()
        const incomes = storedIncome
        const expenses = storedExpenses;

        updateUI.updateTransaction(incomes, expenses)
    }

    static updateTransaction(incomes, expenses) {
        let totalAmount = 0;
        let index = 0;
        for (index = 0; index < incomes.length; index++) {
            totalAmount += +incomes[index].amount
        }
        let totalExpenses = 0;
        for (let i = 0; i < expenses.length; i++) {
            totalExpenses += +expenses[i].amount
        }
        let balance = 0;

        updateUI.updateIncome(totalAmount, totalExpenses, balance)        
    }

    static updateIncome(totalAmount, totalExpenses, balance) {
        
        balance = totalAmount - totalExpenses

        document.querySelector(".avail-price").innerText = balance
        document.querySelector(".total-income").innerText = totalAmount

         updateUI.showChart(totalAmount, totalExpenses, balance)
    }

    static addIncomeToList(income) {
        const incomeList = document.querySelector(".income-list");
        const tableRow = document.createElement("tr");
        tableRow.style.boxShadow = "1px 1px 2px grey";
        tableRow.classList.add("border")
        tableRow.innerHTML = `
            <td >${income.description}</td>
            <td class = "text-success"> $<span class="income-amount">${income.amount}</span></td>
        `
        incomeList.appendChild(tableRow)
    }

    static addExpensesToList(expense) {
        const expensesList = document.querySelector(".expenses-list");
        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `
            <td scope="col">${expense.description}</td>
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

    static showChart(totalAmount, totalExpenses, balance) {
         
    var totalIncome = totalAmount + 100;
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
                { y: balance + 50, name: "Income", color: "green" },
                { y: totalExpenses + 50, name: "Expenses", color: "red" }
            ]
        }],
        "Income": [{
            color: "green",
            name: "Income",
            type: "column",
            dataPoints: [
                { x: new Date(), y: totalAmount },
                { x: new Date().getDay(), y: balance },
                
            ]
        }],
        "Expenses": [{
            color: "red",
            name: "Expenses",
            type: "column",
            dataPoints: [
                { x: new Date(), y: totalExpenses},
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
}

class Storage {
        
    static getIncome() {
        let incomes;
        if (localStorage.getItem("incomes") === null) {
            incomes = []
        } else {
            incomes = JSON.parse(localStorage.getItem("incomes"))
        }
        return incomes
    }

    static addIncome(income) {
        let incomes = Storage.getIncome()
        incomes.push(income)
        localStorage.setItem("incomes", JSON.stringify(incomes))
    }

    static getExpenses() {
        let expenses;
        if (localStorage.getItem("expenses") === null) {
            expenses = []
        } else {
            expenses = JSON.parse(localStorage.getItem("expenses"))
        }
        return expenses
    }

    static addExpenses(expense) {
        let expenses = Storage.getExpenses()
        expenses.push(expense)
        localStorage.setItem("expenses", JSON.stringify(expenses))
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
    const income = new Finance_Tracker(amount, incomeSource)

    

        //add income to list
        updateUI.addIncomeToList(income)

        //add income to store
        Storage.addIncome(income)

        // clear form value field
        updateUI.clearField()

        //show alert
        updateUI.showAlert(`$${amount} credited`, ".income-form", "bg-success")
        
        //dynamic account update 
        updateUI.dynamicIncomeUpdate()
    
})

//event to add expenses
document.querySelector(".expenses-form").addEventListener("submit", function updateIncome(e) {
    e.preventDefault();
    const amount = document.querySelector("#expense").value
    const expenseReason = document.querySelector("#expense-reason").value
    const balance = document.querySelector(".avail-price").innerText

    //instantiate new tracker for expenses 
    const expense = new Expenses(amount, expenseReason)
    if (expense.amount < +balance) {
        //add income to list
        updateUI.addExpensesToList(expense)

        //add expenses to storage
        Storage.addExpenses(expense)

        //clear fields 
        updateUI.clearField()

        //show alert
        updateUI.showAlert(`$${amount} Debited`, ".expenses-form", "bg-danger");

          //dynamic account update 
        updateUI.dynamicIncomeUpdate()
    
    } else {
        updateUI.showAlert(`Insufficient fund`, ".expenses-form", "bg-danger")
    }
})

//hide section

updateUI.hideSection(".expense-cancel .fa-times-circle", ".expense-container")
updateUI.hideSection(".income-cancel .fa-times-circle", ".income-container")

//show section
updateUI.showSection(".debit-btn", ".expense-container")
updateUI.showSection(".credit-btn", ".income-container")
