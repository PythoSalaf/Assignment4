class BankAccount {
  constructor(accountNumer, ownerName, balance) {
    this.accountNumber = accountNumer;
    this.ownerName = ownerName;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds, Withdrawal  Failed.");
    } else {
      this.balance -= amount;
      console.log(`Withdrawn #${amount}. New balance: ${this.balance}`);
    }
  }

  checkBalance() {
    console.log(`Account balance for ${this.ownerName}: $${this.balance}`);
    return this.balance;
  }

  monthlyInterest() {
    throw new Error("This method should be implemented in subclasses");
  }
}

class SavingsAccount extends BankAccount {
  constructor(accountNumber, ownerName, balance, interestRate) {
    super(accountNumber, ownerName, balance);
    this.interestRate = interestRate;
  }

  monthlyInterest() {
    const interestEarned = (this.balance * this.interestRate) / 12;
    this.balance += interestEarned;
    console.log(
      `Monthly interest earned: $${interestEarned}. New balance: $${this.balance}`
    );
  }
}

class CurrentAccount extends BankAccount {
  constructor(accountNumber, ownerName, balance, monthlyFee) {
    super(accountNumber, ownerName, balance);
    this.monthlyFee = monthlyFee;
  }

  // Override the monthlyInterest method for CurrentAccount
  monthlyInterest() {
    this.balance -= this.monthlyFee;
    console.log(
      `Monthly fee deducted: $${this.monthlyFee}. New balance: $${this.balance}`
    );
  }
}

// Creating a regular BankAccount
const regularAccount = new BankAccount(1, "John Doe", 1000);
regularAccount.deposit(500);
regularAccount.withdraw(200);
regularAccount.checkBalance();

// Creating a SavingsAccount
const savingsAccount = new SavingsAccount(2, "Jane Smith", 2000, 0.05);
savingsAccount.deposit(1000);
savingsAccount.monthlyInterest();
savingsAccount.checkBalance();

// Creating a CurrentAccount
const currentAccount = new CurrentAccount(3, "Bob Johnson", 1500, 10);
currentAccount.deposit(800);
currentAccount.monthlyInterest();
currentAccount.checkBalance();
