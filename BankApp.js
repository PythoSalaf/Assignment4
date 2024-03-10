class BankAccount {
  static usedAccountNumbers = new Set();
  constructor(accountNumber, ownerName, balance) {
    this.accountNumber = this.validateAndSetAccountNumber(accountNumber);
    this.ownerName = ownerName;
    this.balance = balance;
  }

  validateAndSetAccountNumber(accountNumber) {
    const sanitizedAccountNumber = accountNumber.toString().trim();

    if (
      sanitizedAccountNumber.length === 10 &&
      /^\d+$/.test(sanitizedAccountNumber) &&
      !BankAccount.usedAccountNumbers.has(sanitizedAccountNumber)
    ) {
      BankAccount.usedAccountNumbers.add(sanitizedAccountNumber);
      return sanitizedAccountNumber;
    } else {
      console.error(
        "Invalid account number. Please provide a 10-digit numeric account number."
      );
      return null;
    }
  }

  deposit(amount) {
    this.balance += amount;
    if (this.accountNumber && this.ownerName && this.balance) {
      console.log(`Deposited #${amount}. New balance: #${this.balance}`);
    }
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds, Withdrawal  Failed.");
    } else {
      this.balance -= amount;
      if (this.accountNumber && this.ownerName && this.balance) {
        console.log(`Withdrawn #${amount}. New balance: #${this.balance}`);
      }
    }
  }

  checkBalance() {
    if (this.accountNumber && this.ownerName && this.balance) {
      console.log(`Account balance for ${this.ownerName} is #${this.balance}`);
    }
    return this.balance;
  }

  monthlyInterest() {
    if (this.accountNumber && this.ownerName && this.balance) {
      throw new Error("This method should be implemented in subclasses");
    } else {
      console.error(
        "Invalid account details. Please provide account number, owner name, and balance."
      );
    }
  }
}

class SavingsAccount extends BankAccount {
  constructor(accountNumber, ownerName, balance, interestRate) {
    super(accountNumber, ownerName, balance);
    this.interestRate = interestRate;

    if (!this.interestRate) {
      console.error(
        "Invalid interest rate. Please provide a valid interest rate."
      );
    }
  }

  monthlyInterest() {
    if (
      this.accountNumber &&
      this.ownerName &&
      this.balance &&
      this.interestRate
    ) {
      const interestEarned = (this.balance * this.interestRate) / 12;
      this.balance += interestEarned;
      console.log(
        `Monthly interest earned: #${interestEarned}. New balance: #${this.balance}`
      );
    } else {
      console.error(
        "Invalid account details. Please provide account number, owner name, balance, and interest rate."
      );
    }
  }
}

class CurrentAccount extends BankAccount {
  constructor(accountNumber, ownerName, balance, monthlyFee) {
    super(accountNumber, ownerName, balance);
    this.monthlyFee = monthlyFee;

    if (!this.monthlyFee) {
      console.error("Invalid monthly fee. Please provide a valid monthly fee.");
    }
  }

  monthlyInterest() {
    if (
      this.accountNumber &&
      this.ownerName &&
      this.balance &&
      this.monthlyFee
    ) {
      this.balance -= this.monthlyFee;
      console.log(
        `Monthly fee deducted: #${this.monthlyFee}. New balance: #${this.balance}`
      );
    } else {
      console.error(
        "Invalid account details. Please provide account number, owner name, balance, and monthly fee."
      );
    }
  }
}

// Creating a regular BankAccount
const regularAccount = new BankAccount(2163088198, "John Doe", 1000);
regularAccount.deposit(500);
regularAccount.withdraw(200);
regularAccount.checkBalance();

// Creating a SavingsAccount
const savingsAccount = new SavingsAccount(6063088198, "Jane Smith", 2000, 0.05);
savingsAccount.deposit(1000);
savingsAccount.monthlyInterest();
savingsAccount.checkBalance();

// Creating a CurrentAccount
const currentAccount = new CurrentAccount(4063088198, "Bob Johnson", 1500, 10);
currentAccount.deposit(800);
currentAccount.monthlyInterest();
currentAccount.checkBalance();
