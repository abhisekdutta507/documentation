## What is Abstraction?

Abstraction in **Object-Oriented Programming** (OOP) is the process of hiding the complex implementation details and showing only the necessary features to the user or a programmer.

### Example:

Let's create an **account** object of a banking system. The bank allows the users to **deposit**, **withdraw** & **checkBalance**.

```ts
interface FD {
  principal: number;
  interest: number;
  maturityAmount: number;
  accountOpeningDate: Date;
  maturityDate: Date;
}

const DaysInMonth = new Map<number, number>([
  [0, 31],
  [1, 28],
  [2, 31],
  [3, 30],
  [4, 31],
  [5, 30],
  [6, 31],
  [7, 31],
  [8, 30],
  [9, 31],
  [10, 30],
  [11, 31],
]);

function BankAccount(amount: number) {
  let balance: number = amount;
  const fds: FD[] = [];
  const roi = 5.5;

  const addDays = (date: Date, days: number): Date => {
    let dd = date.getDate() + days;
    let mm = date.getMonth();
    let yyyy = date.getFullYear();

    const daysInMonth = DaysInMonth.get(mm) as number;
    if (dd > daysInMonth) {
      mm += 1;
      dd = dd - daysInMonth;
    }

    if (mm > 11) {
      mm -= 1;
      yyyy++;
    }

    date.setDate(dd);
    date.setMonth(mm);
    date.setFullYear(yyyy);

    return date;
  }

  const hasSufficientBalance = (amount: number): boolean => {
    if (amount < 1) {
      return false;
    }

    if (balance < amount) {
      return false;
    }

    return true;
  }

  const calculateInterestAmount = (amount: number, tenureInDays: number): number => {
    const interestInAYear = roi * amount / 100;
    const interestInGivenPeriod = interestInAYear * tenureInDays / 365;
    return interestInGivenPeriod;
  }

  this.createFD = function createFD(amount: number, tenureInDays: number) {
    if (!hasSufficientBalance(amount)) {
      return 0;
    }

    const interest = calculateInterestAmount(amount, tenureInDays);
    const principal = this.withdraw(amount);
    const currentDate = new Date();
    const fd = {
      principal,
      interest,
      maturityAmount: principal + interest,
      tenureInDays,
      accountOpeningDate: currentDate,
      maturityDate: addDays(new Date(currentDate), tenureInDays),
    };
    fds.push(fd);
    return fd.maturityAmount;
  }

  this.checkBalance = function checkBalance() {
    return {
      balance,
      fds,
    };
  }

  this.withdraw = function withdraw(amount: number) {
    if (!hasSufficientBalance(amount)) {
      return 0;
    }

    balance -= amount;
    return amount;
  }

  this.deposit = function deposit(amount: number) {
    if (amount < 1) {
      return balance;
    }

    balance += amount;
    return balance;
  }
}

const account = new BankAccount(200);
const depositedAmount = account.deposit(10000);
const maturityAmount = account.createFD(5000, 9);
console.log(account.checkBalance());
```

As a user of the bank I can only use the member functions **deposit**, **withdraw** & **checkBalance**. Without thinking about the complex calculation logic just being able to use the functions is called **Abstraction**.
