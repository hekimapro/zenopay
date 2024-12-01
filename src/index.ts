import ZenoPay from "./package"; // Import the ZenoPay class from the package.

// Configuration options for initializing ZenoPay instance.
const zenoPayOptions = {
    accountID: "zp51004", // ZenoPay account identifier.
    apiKey: "e043615fdc83bac55e2a4a1395aa818a", // API key for authentication.
    secretKey: "173752605b09853559b5dbc900f6a169dbf5a6f311bc2bb611cb5f90350b04e9", // Secret key for secure requests.
};

// Create an instance of ZenoPay using the provided configuration options.
const zenoPay = new ZenoPay(zenoPayOptions);

/**
 * Demonstrates how to make a payment using the ZenoPay API.
 */
async function makePayment() {
    try {
        // Define payment details, including amount and customer information.
        const paymentOptions = {
            amountToCharge: 500, // Amount to be charged in the transaction.
            customerName: "Hekima Peter", // Name of the customer.
            customerPhoneNumber: "0752628215", // Customer's phone number.
            customerEmail: "info@hekima.pro", // Customer's email address.
        };

        // Call the Pay method to initiate the payment and log the response.
        const result = await zenoPay.Pay(paymentOptions);

        console.log(result); // Log the API response to the console.
    } catch (error) {
        // Log any errors encountered during the payment process.
        console.error(error);
    }
}

/**
 * Demonstrates how to check the payment status of a specific order.
 * @param orderID - The unique identifier of the order to check.
 */
async function checkPaymentStatus(orderID: string) {
    try {
        // Call the CheckPaymentStatus method and log the response.
        const result = await zenoPay.CheckPaymentStatus(orderID);

        console.log(result); // Log the API response to the console.
    } catch (error) {
        // Log any errors encountered while checking the payment status.
        console.error(error);
    }
}

// Uncomment the following lines to execute the functions:

// makePayment(); // Execute the makePayment function to initiate a payment.
// checkPaymentStatus("674c0d32b09dd"); // Execute the checkPaymentStatus function to check the status of an order.
