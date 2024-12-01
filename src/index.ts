import { PaymentOptionsType, RequestResponseType, ZenoPayOptionsType } from "./types/index"
import qs from "qs"
import axios from "axios"
import {string, number, email} from "fast-web-kit"


class ZenoPay {

    // Class properties
    private apiKey: string // API key for authenticating requests.
    private baseURL: string // Base URL for the ZenoPay API.
    private secretKey: string // Secret key for secure API requests.
    private accountID: string // Unique identifier for the ZenoPay account.
    private headers: any // HTTP headers for API requests.

    /**
     * Initializes a new instance of the ZenoPay class.
     * @param zenoPayOptions - Configuration options including API key, secret key, and account ID.
     */
    constructor(zenoPayOptions: ZenoPayOptionsType) {
        this.apiKey = zenoPayOptions.apiKey
        this.secretKey = zenoPayOptions.secretKey
        this.accountID = zenoPayOptions.accountID
        this.baseURL = "https://api.zeno.africa"
        this.headers = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // API requires form-encoded data.
            }
        }
    }

    /**
     * Handles making POST requests to the ZenoPay API.
     * @param route - API endpoint route.
     * @param requestData - Data to send with the request.
     * @returns A promise resolving to the API response.
     */
    private postRequest = async (route: string, requestData: any): Promise<RequestResponseType> => {
        try {

            // Convert request data to query string format.
            requestData = qs.stringify(requestData)

            const response: any = await axios.post(`${this.baseURL}/${route}`, requestData, this.headers)

            const { status }: any = response.data

            // Return success or failure based on the API response status.
            if (status === "success")
                return { success: true, message: { ...response.data } }

            return { success: false, message: response.data.message }
        } catch (error) {
            // Handle errors and return a failure response with the error message.
            return { success: false, message: (error as Error).message }
        }
    }

    /**
     * Initiates a payment request.
     * @param paymentOptions - Details of the payment including customer info and amount.
     * @returns A promise resolving to the payment API response.
     */
    public Pay = async (paymentOptions: PaymentOptionsType): Promise<RequestResponseType> => {
        try {
            // Validate required payment details.
            if (string.isEmpty(paymentOptions.customerName))
                return { success: false, message: "Customer name is required" }

            if (string.isEmpty(paymentOptions.customerEmail))
                return { success: false, message: "Customer email is required" }

            if (!email.isValid(paymentOptions.customerEmail))
                return { success: false, message: "Invalid customer email" }

            if (string.isEmpty(paymentOptions.customerPhoneNumber))
                return { success: false, message: "Customer phone number is required" }

            const phoneNumberLength = string.getLength(paymentOptions.customerPhoneNumber)

            if (phoneNumberLength !== 10 && phoneNumberLength !== 12)
                return { success: false, message: "Customer phone number must have 10 or 12 characters" }

            if (!number.isValid(paymentOptions.amountToCharge))
                return { success: false, message: "Invalid amount" }

            if (paymentOptions.amountToCharge <= 0)
                return { success: false, message: "Amount cannot be less than or equal to 0" }

            // Construct the request payload for the API.
            const requestData = {
                create_order: 1,
                api_key: this.apiKey,
                account_id: this.accountID,
                secret_key: this.secretKey,
                amount: paymentOptions.amountToCharge,
                buyer_name: paymentOptions.customerName,
                buyer_email: paymentOptions.customerEmail,
                buyer_phone: paymentOptions.customerPhoneNumber,
            }

            // Make the API call and return the response.
            return this.postRequest("", requestData)
        } catch (error) {
            // Handle errors and return a failure response.
            return { success: false, message: (error as Error).message }
        }
    }

    /**
     * Checks the status of a payment using its order ID.
     * @param orderID - The unique identifier of the order.
     * @returns A promise resolving to the payment status API response.
     */
    public CheckPaymentStatus = async (orderID: string): Promise<RequestResponseType> => {
        try {
            // Validate the order ID.
            if (string.isEmpty(orderID))
                return { success: false, message: "Order ID is required" }

            // Construct the request payload for the API.
            const requestData = {
                check_status: 1,
                order_id: orderID,
            }

            // Make the API call and return the response.
            return this.postRequest("order-status", requestData)
        } catch (error) {
            // Handle errors and return a failure response.
            return { success: false, message: (error as Error).message }
        }
    }
}

export default ZenoPay