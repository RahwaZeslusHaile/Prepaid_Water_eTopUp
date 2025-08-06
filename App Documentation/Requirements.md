
# Prepaid Water Top-up App – Requirements Document

## 1. Problem Statement

Many prepaid electricity and water users face challenges when topping up their meters due to reliance on keypads.  
Currently, users must purchase a token from retail outlets or online, then manually enter it on a keypad near the meter.  
This process has several limitations, including:

- Risk of losing paper tokens  
- Inconvenience of sending tokens to someone on-site  
- Unavailability of tokens at retailers  
- Inability to top up when stores are closed  
- Faulty keypads preventing successful recharges  

To address these issues, we propose developing a web app that enables **direct meter top-ups**, eliminating the need for keypads.  
This app will allow users to:

- Purchase tokens seamlessly from vendors  
- Top up from anywhere  
- Check balances  
- Review purchase history and usage reports  
- Manage multiple meters  

---

## 2. Project Goals

- Eliminate manual keypad-based top-ups  
- Increase user convenience and access  
- Provide a secure, user-friendly interface  
- Enable real-time top-up confirmation  
- Support multiple meter management  

---

## 3. Core Features (MVP)

- ✅ User authentication (Sign up, login)  
- ✅ Meter registration and validation  
- ✅ Purchase top-up via online payment  
- ✅ View balance and purchase history  
- ✅ Support for topping up own or others' meters  
- ✅ Secure transaction system  
- ✅ Admin dashboard for monitoring  

---

## 4. Additional Features (Post-MVP)

- In-app notifications or SMS alerts  
- Meter balance reminders  
- Monthly usage reports  
- Integration with electricity top-up (multi-utility app)  
- Multi-language support  
- Offline capabilities or SMS fallback  

---

## 5. User Stories

* As a **user**, I want to **sign up and log in**, so that I can securely access my account.
* As a **user**, I want to **top up my water meter**, so that I can get water credit without entering a token.
* As a **user**, I want to **register a new meter**, so that I can manage multiple meters from one account.
* As a **user**, I want to **see my balance**, so that I know how much water credit I have left.
* As a **user**, I want to **see a purchase history/report**, so that I can track my water usage and spending.
* As a **user**, I want to **top up someone else’s meter**, so that I can help friends or family.
* As a **user**, I want to **delete a meter**, so that I can remove old or invalid meters from my account.
* As a **vendor**, I want to **validate new meter numbers**, so that only active and supported meters can be used.
* As an **admin**, I want to **monitor all top-ups and transactions**, so that I can ensure the system is running smoothly.

---

## 6. Requirements

## Functional Requirements
- User registration and login
- Secure storage of user meter numbers
- Real-time meter top-up feature
- Balance check integration
- Support for multiple meter numbers
- Ability to top up other meters
- View transaction history
- Confirmation messages via email/SMS
- Payment gateway integration (e.g. PayFast, Ozow, SnapScan)
- Admin dashboard for vendors
- Meter validation process
- User deletion and meter unlinking

## Non-Functional Requirements
- Fast response time for top-up transactions
- Mobile responsiveness and accessibility
- Secure data handling (encryption, HTTPS)
- Scalable infrastructure (cloud-based preferred)
- High availability and minimal downtime
- Clear and intuitive user interface
- Compliance with local data protection laws (e.g., POPIA)

👥 ## User Requirements
- Simple and fast sign-up process
- Secure and reliable login
- Easy-to-use interface for meter top-up
- Access to transaction history and receipts
- Mobile-first experience
- Option to top up others' meters

## Vendor Requirements
- Access to user database (restricted and secure)
- Ability to verify and validate meters
- View analytics on usage and top-ups
- Admin controls for customer support
- Ability to communicate announcements (e.g., maintenance)

## Developer Requirements
- Integration with South African payment APIs (PayFast, Yoco, etc.)
- API for meter top-up and balance check
- Modular backend architecture (Node.js, Django, etc.)
- Secure database (Firebase, Firestore, MySQL)
- GitHub repository with clear folder structure
- API documentation and error handling
- Testing and CI setup

## 7. Stakeholders

- End Users (homeowners, tenants, etc.)  
- Admin/Vendor (manage and approve meters)  
- Developers and Designers  
- Potential integration with utility provider  

---

## 8. Technology Stack (Proposed)

- **Frontend**: HTML, CSS, JavaScript (React/Next.js)  
- **Backend**: Node.js + Express.js  
- **Database**: Firestore / Google Sheets (for MVP)  
- **Authentication**: Firebase Auth  
- **Payments**: Flutterwave / Stripe / Mobile Money API  
- **Hosting**: Firebase / Vercel / AWS  

---

## 9. Milestones (4-Week Plan)

**Week 1**  
- Setup repo, structure, and design UI  
- Build Login / Signup screens  
- Connect to Firebase Auth  

**Week 2**  
- Add meter registration, validation, and dashboard UI  
- Implement dummy top-up logic  
- Store purchase data  

**Week 3**  
- Integrate payment gateway  
- Enable real top-up requests  
- Add balance & history view  

**Week 4**  
- Polish UI/UX  
- Test thoroughly  
- Prepare for final demo  

