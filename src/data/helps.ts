export enum HeaderText {
    registration = 'REGISTRATION',
    product = 'PRODUCT',
    returnExchange = 'RETURN/EXCHANGE',
    refund = 'REFUND',
    others = 'OTHERS',
}

export interface HelpItem {
    question: string;
    answer: string;
    details?: string[];
}

export const helpData: Record<HeaderText, HelpItem[]> = {
    [HeaderText.registration]: [
        {
            question: '1. Do I have to register as a member to shop on Converse Vietnam?',
            answer: 'You can shop easily without having to register. But if you register as a member of Converse Vietnam, you will enjoy various benefits such as',
            details: [
                'Faster checkout on your next order',
                'Saving more than 1 delivery address on your account',
                'Update your account information',
                'Track your order status',
                'View previous orders',
                'The option to subscribe to our newsletter, where you will get a large selection of new products, promotions, special prices, events and other interesting offers.',
            ],
        },
        {
            question: '2. How to register as a member of Converse Vietnam?',
            answer: 'Please follow the steps below',
            details: [
                'Click “Register” on the website’s right top corner',
                'Fill in the detail and click "Create An Account',
            ],
        },
        {
            question: '3. How to update my account',
            answer: 'Please follow the steps below:',
            details: [
                'Click “Sign In” on website’s right top corner, fill in your registered email and password, and click “Sign In”',
                'Click “Account Information” menu to update your personal information, and click “Change” for information you wish to update then click ‘’Save’’',
            ],
        },
        {
            question: '4. What if I forget my password?',
            answer: 'Please follow the steps below:',
            details: [
                'Click “Login” on the website’s right top corner',
                'Click “Forgot Your Password?”',
                ' Fill in your registered email address',
                'Click “Reset My Password”',
                'You will receive a password reset link on your registered email',
            ],
        },
        {
            question: '5. How to update delivery address?',
            answer: 'Please follow the steps below:',
            details: [
                'Click “Sign In” on website’s right top corner, fill in your registered email and password and click “Sign In”',
                'Click “Address Book” to update your personal information',
                'Choose “Change Billing Address” for information you wish to update or “Add New Address” to save more than one delivery address.',
            ],
        },
    ],
    [HeaderText.product]: [
        {
            question: '1. Are the products sold on website different with those on offline store?',
            answer: 'Most of our products are the same, however in certain collections some products may be available exclusively on either one of the channels.',
        },
        {
            question:
                '2. Are there any price differences between online and offline store products?',
            answer: 'Prices may change at any time due to promotions. The promotional price offered for a certain product is valid for a limited period. We recommend you to become a member of Converse Vietnam and register for our newsletter to receive regular promotional information.',
        },
        {
            question: '3. Why do product prices at Converse Vietnam change frequently?',
            answer: 'Prices may change at any time due to promotions. The promotional price offered for a certain product is valid for a limited period. We recommend you to become a member of Converse Vietnam and register for our newsletter to receive regular promotional information.',
        },
        {
            question: '4. How to decide on shoes and clothing size?',
            answer: 'Please follow these simple steps:',
            details: [
                'Go to the product page you wish to order',
                'Click on "Size Guide" to see the detailed size chart for shoes and clothing',
            ],
        },
        {
            question: '5. What is the product insole size in CM?',
            answer: 'You can see the insole size information in CM (centimetre) on the size chart provided in the product details.',
        },
        {
            question: '6. What size do I choose for Vietnamese size?',
            answer: 'The size commonly used is in EU. You can also view and adjust the insole size in CM (centimetre) on the available size chart',
        },
        {
            question: '7. Can I change the product size?',
            answer: 'Size changes or any changes to order details cannot be done. Please make sure all your order details are correct before payment. Sizes and products shipped are according to your order.',
        },
    ],
    [HeaderText.returnExchange]: [
        {
            question: '1. When can I make a product return request?',
            answer: 'Request for product return must be made within 14 days of when the order is received. Returned products must be received at the pre-determined location no later than 7 days after the date of return is approved by Converse Vietnam.',
        },
        {
            question: '2. What products cannot be submitted for returns and exchanges?',
            answer: 'Requests for returns and exchanges are not applicable for swimwear, sports bra, sports apparel, tight clothing (including legging, compression, cycling pants), socks, fitness equipment, sports accessories (including hats), and other products or brands with specific Terms and Conditions and stated clearly on its description.',
        },
        {
            question: '3. How do I make a product return request?',
            answer: 'Please contact our Customer Service Team to make a return request.',
        },
        {
            question:
                '4. What are the rules for returning products purchased with a bundling promo? (Example: Buy 1 Get 1 promo, Buy 1 Get 50% 2nd item, etc.)',
            answer: 'Products purchased on promotional basis are non-refundable.',
        },
    ],
    [HeaderText.refund]: [
        {
            question: '1. What refund methods are available at Converse Vietnam?',
            answer: 'We will process your refund based on the payment method selected during your initial purchase, namely the refund of the Credit Card for the Credit Card payment method. Refunds cannot be made in cash.',
        },
        {
            question: '2. Will I be reimbursed for shipping fee of returning the product?',
            answer: 'We apologize, we do not reimburse the shipping fee for returned products.',
        },
        {
            question: '3. When will I receive my refund?',
            answer: 'The refund process takes 7 to 14 working days, depending on the refund payment method. We will process your refund as soon as we receive the returned product from you and the account information details based on the initial payment method selected during your purchase. Shipping fees for returned products will not be included in the refund.',
        },
        {
            question:
                '4. What are the refund rules regarding product returns or orders cannot be fulfilled by Converse Vietnam?',
            answer: 'Refunds will be processed according to the bill/amount you paid, excluding discounts from e-Vouchers/coupons.',
        },
        {
            question: '5. What shipping methods are available for product returns?',
            answer: 'You may return the product via our delivery partner. Please inform our Customer Service Team for product returns request.',
        },
    ],
    [HeaderText.others]: [
        {
            question: '1. What promotions are currently available?',
            answer: 'You can get information about ongoing promotions through the banner on the store is website main page. We always provide information on the latest products and promotions on this page.',
        },
        {
            question: '2. Voucher Code cannot be used',
            answer: 'Please refer to the validity period, as well as the voucher is Terms and Conditions.',
        },
    ],
};
