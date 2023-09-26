import React from 'react';
import style from './Terms.module.scss';
import Image from 'next/image';

import termsAndConditionsIcon from '../../../public/img/icon/terms.svg'


export default function Terms(){
    
    return(
        <div className={style.Terms}>
            
            <div className={style.title}>
                <div className={style.iconContainer}>
                    <Image src={termsAndConditionsIcon} alt="icon" />
                </div>
                <span>Terms &amp; conditions</span>
            </div>
            <div className={style.container}>

                <div className={style.name}>1. Terms and Conditions:</div>
                <ul>
                    <li>
                    <span>Acceptance of Terms:</span> All visitors and users of the online store are required to read, understand, and agree to the terms and conditions before using the website.
                    </li>
                    <li>
                    <span>Product Information:</span> Ensure accuracy of product descriptions, prices, and availability. Reserve the right to modify information without notice.
                    </li>
                    <li>
                    <span>User Accounts:</span> Users must create accounts for purchasing and may not share account credentials. Protect personal information and account security.
                    </li>
                    <li>
                    <span>Intellectual Property:</span> Clarify ownership of content, trademarks, and copyrights. Prohibit unauthorized use of intellectual property.
                    </li>
                    <li>
                    <span>Payment and Billing:</span> Specify accepted payment methods, currency, pricing, and taxes. Clarify billing procedures and currency conversion rates.
                    </li>
                    <li>
                    <span>Shipping and Returns:</span> Outline shipping options, costs, delivery times, and return policies. Explain conditions for returns and refunds.
                    </li>
                    <li>
                    <span>Prohibited Conduct:</span> Prohibit abusive language, harassment, fraudulent activities, and any behavior that violates applicable laws.
                    </li>
                </ul>


                <div className={style.name}>2. Privacy Policy:</div>
                <ul>
                    <li>
                    <span>Data Collection:</span> Clearly state what user data is collected, including personal information and cookies.
                    </li>
                    <li>
                    <span>Data Usage:</span> Explain how collected data is used, such as order processing, customer support, and marketing communications.
                    </li>
                    <li>
                    <span>Data Sharing:</span> Specify instances where data may be shared with third parties, such as payment processors and shipping companies.
                    </li>
                    <li>
                    <span>Security Measures:</span> Describe the security measures in place to protect user data from unauthorized access.
                    </li>
                    <li>
                    <span>User Rights:</span> Inform users about their rights to access, correct, and delete their personal data.
                    </li>
                </ul>
                

                <div className={style.name}>3. Payment and Security:</div>
                <ul>
                    <li>
                    <span>Payment Methods:</span> List accepted payment methods and assure users of secure payment processing.
                    </li>
                    <li>
                    <span>Payment Security:</span> Detail the measures taken to protect sensitive payment information and ensure PCI DSS compliance.
                    </li>
                </ul>


                <div className={style.name}>4. Shipping and Returns:</div>
                <ul>
                    <li>
                    <span>Shipping Information:</span> Provide transparent shipping details, including costs, delivery times, and available options.
                    </li>
                    <li>
                    <span>Returns and Refunds:</span> Clearly explain the process for initiating returns and obtaining refunds. State any conditions for eligibility.
                    </li>
                </ul>


                <div className={style.name}>5. Intellectual Property:</div>
                <ul>
                    <li>
                    <span>Copyright and Trademarks:</span> Specify ownership of website content, product images, and trademarks. Address potential copyright infringement by users.
                    </li>
                    <li>
                    <span>User-Generated Content:</span> Establish guidelines for user-generated content, including rights and usage permissions.
                    </li>
                </ul>

                                
                <div className={style.name}>6. Prohibited Content and Conduct:</div>
                <ul>
                    <li>
                    <span>Prohibited Items:</span> List items that are not allowed for sale due to legal, ethical, or safety reasons.
                    </li>
                    <li>
                    <span>User Conduct:</span> Prohibit harassment, hate speech, spam, and any behavior that violates your terms and conditions.
                    </li>
                </ul>

                                
                <div className={style.name}>7. Age Restrictions:</div>
                <ul>
                    <li>
                    <span>Age Requirements:</span> Clearly state any age restrictions for purchasing specific products or accessing certain content.
                    </li>
                </ul>


                <div className={style.name}>8. Accessibility:</div>
                <ul>
                    <li>
                    <span>Accessibility Standards:</span> Commit to making the online store accessible to users with disabilities in accordance with relevant accessibility guidelines.
                    </li>
                </ul>


                <div className={style.name}>9. Contact Information:</div>
                <ul>
                    <li>
                    <span>Customer Support:</span> Provide clear contact information for customer inquiries, feedback, and support requests.
                    </li>
                </ul>


                <div className={style.name}>10. Governing Law and Dispute Resolution:</div>
                <ul>
                    <li>
                    <span>Governing Jurisdiction:</span> Specify the jurisdiction that governs the terms and conditions of the online store.
                    </li>
                    <li>
                    <span>Dispute Resolution:</span> Outline procedures for resolving disputes, including negotiation, mediation, or arbitration.
                    </li>
                </ul>


            </div>

        </div>
    )
}