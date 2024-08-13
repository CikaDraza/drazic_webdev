import React, { useRef } from 'react'

export default function ContactForm() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

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
