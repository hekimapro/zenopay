# ZenoPay

ZenoPay is a simple and seamless payment designed for developers looking to integrate secure and reliable payment functionality into their applications. With minimal setup, you can initiate payments and track their statuses effortlessly.

### Supported Mobile Networks
ZenoPay supports the following mobile payment networks:
- **M-PESA**
- **TIGOPESA (MIX BY YAS)**
- **HALOPESA**
- **AIRTEL MONEY**

---


## Installation

Install the package using npm or yarn:

```bash
# Using npm
npm install zenopay

# Using yarn
yarn add zenopay
```

---

## Usage

### 1. **Backend Integration**
Here’s how to integrate ZenoPay in a Node.js backend application:

```typescript
import ZenoPay from "zenopay";

const zenoPayOptions = {
    accountID: "your-account-id",
    apiKey: "your-api-key",
    secretKey: "your-secret-key",
};

const zenoPay = new ZenoPay(zenoPayOptions);

// Make a payment
async function makePayment() {
    const paymentOptions = {
        amountToCharge: 1000,
        customerName: "John Doe",
        customerEmail: "johndoe@example.com",
        customerPhoneNumber: "0701234567",
    };

    const result = await zenoPay.Pay(paymentOptions);
    console.log(result);
}

// Check payment status
async function checkPaymentStatus(orderID: string) {
    const result = await zenoPay.CheckPaymentStatus(orderID);
    console.log(result);
}
```

## API Reference

### 1. **`Pay(paymentOptions: PaymentOptionsType): Promise<RequestResponseType>`**
Initiates a payment request.

#### Parameters:
- `paymentOptions`: An object with the following properties:
  - `amountToCharge` (number): Amount to charge (must be greater than 0).
  - `customerName` (string): Full name of the customer.
  - `customerEmail` (string): Email address of the customer.
  - `customerPhoneNumber` (string): Phone number of the customer (10 or 12 digits).

#### Response:
Returns a promise resolving to:
```typescript
{
    success: boolean,
    message: any // API response or error message
}
```

---

### 2. **`CheckPaymentStatus(orderID: string): Promise<RequestResponseType>`**
Checks the status of a payment.

#### Parameters:
- `orderID` (string): Unique identifier of the order to track.

#### Response:
Returns a promise resolving to:
```typescript
{
    success: boolean,
    message: any // API response or error message
}
```

---

## Example Responses

### Payment Response:
```json
{
{
  "success": true,
  "message": {
    "status": "success",
    "message": "Wallet payment successful",
    "order_id": "674c0d32b09dd"
  }
}
}
```

### Payment Status Response:
```json
{
  "success": true,
  "message": {
    "status": "success",
    "order_id": "674c0d32b09dd",
    "message": "Order status updated",
    "payment_status": "PENDING"
  }
}
```

---

## Best Practices

- **Keep your keys secure**: Never expose your `apiKey` or `secretKey` in frontend applications. Use environment variables or a secure backend to manage these keys.
- **Validate Inputs**: Ensure all customer details and payment amounts are validated before initiating a payment.
- **Error Handling**: Implement proper error handling to manage failed requests or API errors.

---

## Support

For questions or support, contact us at [md@zeno.co.tz](mailto:md@zeno.co.tz).

---

## License

This project is licensed under the [MIT License](LICENSE).

---