import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = React.forwardRef((props, ref) => {
  const [state, handleSubmit] = useForm("mbloylgq");

  return (
    <section ref={ref} className="contact-section">
      <div className="contact-header">
        <h2 className="contact-title">Contact</h2>
        <div className="contact-divider"></div>
      </div>

      <div className="contact-info">
        <p>
          <span className="contact-key">Email: </span>
          <a href="mailto:vishnusimha98@gmail.com" className="contact-value">
            vishnusimha98@gmail.com
          </a>
        </p>
        <p>
          <span className="contact-key">Phone: </span>
          <a href="tel:+3538995956611" className="contact-value">
            +91 9840339130
          </a>
        </p>
      </div>

      {state.succeeded ? (
        <p className="contact-success-message">
          Thanks! I'll get back to you soon.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <ValidationError prefix="Name" field="name" errors={state.errors} />

          <input type="email" name="email" placeholder="Your Email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <button type="submit" disabled={state.submitting}>
            Send Message
          </button>
        </form>
      )}
    </section>
  );
});

export default Contact;
