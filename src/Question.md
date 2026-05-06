Task 2: Login Form (The Deceptively Simple Challenge) 🔐
The Challenge: "Build a login form. Focus on structure, validation, and state management."

My First Thought: "A login form? That's it? This must be a trick…"

Plot Twist: It was a trick! Not a mean one, but they wanted to see:

How I structure components
My approach to validation (client-side, UX, error handling)
State management patterns
Accessibility considerations
Security mindset (even for a frontend engineer!)
What I Built:

Structure:
Separated concerns (form logic, validation, UI)
Reusable validation utilities
Component composition
2. Validation:

Real-time validation (not just on submit)
User-friendly error messages
Handling async validation (email exists check, etc.)
3. State Management:

Local component state for form data
Validation state management
Loading/submitting states
Error handling
4. Bonus Points:

Accessibility (ARIA labels, keyboard navigation)
Security (discussing XSS prevention, password handling)
UX (loading states, success feedback)
The Discussion: They asked:

"Why did you structure it this way?"
"How would you handle password strength validation?"
"What if we need to add OTP verification later?"
"How do you prevent XSS attacks here?"
My Aha Moment: When I explained that I'd use dangerouslySetInnerHTML for... wait, no, I'd use proper React patterns and sanitisation libraries, they nodded.

They're testing if you think about security, not just functionality! 🛡️

Round 2 Takeaways 💡
Code structure matters — Clean code is maintainable code
Think ahead — How would this scale? What if requirements change?
Explain your architecture — Every decision should have reasoning
Don't skip the "boring" parts — Validation, error handling, accessibility matter