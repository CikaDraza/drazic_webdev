import React, { useRef } from 'react'
import { sendContactForm } from '../utils/api/contact';

export default function ContactForm() {
  const formRef = useRef(null);
  const pattern_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const pattern = /^0\d{8,10}$/;
  const [errors, setErrors] = React.useState({
    fullName: false,
    email: false,
    phone: false,
    message: false
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailValue = formRef.current.querySelector('input[name="email"]');
    const fullNameValue = formRef.current.querySelector('input[name="full-name"]');
    const phoneValue = formRef.current.querySelector('input[name="phone"]');
    const messageValue = formRef.current.querySelector('textarea[name="text"]');

    try {
      const dataForm = new FormData(event.currentTarget);
      const formOutput = {
        email: dataForm.get('email'),
        fullName: dataForm.get('full-name'),
        phone: dataForm.get('phone'),
        message: dataForm.get('text'),
      }

      if (formOutput.fullName === '') {
        setErrors({ ...errors, fullName: true });
        return;
      }
      if(!pattern_email.test(formOutput.email)) {
        setErrors({ ...errors, email: true });
        return;
      }
      if(!pattern.test(formOutput.phone.toString())) {
        setErrors({ ...errors, phone: true });
        return;
      }
      if (formOutput.message === '') {
        setErrors({ ...errors, message: true });
        return;
      }
      
      const { data } = await sendContactForm(formOutput);
      setErrors({ ...errors, email: false, phone: false, imageLength: false });
      emailValue.value = '';
      fullNameValue.value = '';
      phoneValue.value = '';
      messageValue.value = '';
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <div className='contact-form'>
      <form ref={formRef} onSubmit={handleSubmit} method="POST">
        <div className="row">
          <div className="column">
            <div className="input-field">
              <input type="text" name='full-name' id='full-name'/>
              <fieldset>
                <legend>
                  <span>
                    Full Name
                  </span>
                </legend>
              </fieldset>
            </div>
            {errors.fullName && <span>{"Please enter your name"}</span>}
          </div>
          <div className="column">
            <div className="input-field">
              <input type="email" name='email' id='email'/>
              <fieldset>
                <legend>
                  <span>
                    Email
                  </span>
                </legend>
              </fieldset>
            </div>
            {errors.email && <span>{"Please enter a valid email address"}</span>}
          </div>
        </div>
        <div className="row">
          <div className="column">
            <div className="input-field">
              <input type="phone" name='phone' id='phone'/>
              <fieldset>
                <legend>
                  <span>
                    Phone
                  </span>
                </legend>
              </fieldset>
            </div>
            {errors.phone && <span>{"Please enter a valid phone number"}</span>}
          </div>
          <div className="column">
            <div className="input-field">
              <input type="text" name='city' id='city'/>
              <fieldset>
                <legend>
                  <span>
                    City
                  </span>
                </legend>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <textarea rows={2} name="text" id="text"></textarea>
            <fieldset>
              <legend>
                <span>
                  Message
                </span>
              </legend>
            </fieldset>
          </div>
          {errors.message && <span>{"Please enter your question"}</span>}
        </div>
        <div className="row">
          <div className="column submit">
            <div className="submit-btn">
              <button type='submit'>Send Message</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
