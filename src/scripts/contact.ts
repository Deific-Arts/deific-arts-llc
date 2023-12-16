import KemetField from "kemet-ui/dist/components/kemet-field/kemet-field";
import KemetInput from "kemet-ui/dist/components/kemet-input/kemet-input";
import KemetTextarea from "kemet-ui/dist/components/kemet-textarea/kemet-textarea";

const contactForm = document.querySelector('[data-anchor="get-started"] form') as HTMLFormElement;
const contactStatus = document.querySelector('[data-anchor="get-started"] .status') as HTMLElement;
const userInput = document.querySelector('kemet-input[name="user"]') as KemetInput;
const phoneInput = document.querySelector('kemet-input[name="phone"]') as KemetInput;
const emailInput = document.querySelector('kemet-input[name="email"]') as KemetInput;
const messageTextarea = document.querySelector('kemet-textarea[name="message"]') as KemetTextarea;

interface IData {
  message: string;
  code: number;
};

userInput?.addEventListener('kemet-input-status', ((event: CustomEvent) => {
  const field = event.detail.element.closest('kemet-field') as KemetField;

  if (event.detail.status === 'error' && event.detail.validity.valueMissing)  {
    field.message = "Your name is required!"
  } else {
    field.message = '';
  }
}) as EventListener);

phoneInput?.addEventListener('kemet-input-status', ((event: CustomEvent) => {
  const field = event.detail.element.closest('kemet-field') as KemetField;

  if (event.detail.status === 'error')  {
    field.message = "Enter a valid phone number."
  } else {
    field.message = '';
  }
}) as EventListener);

emailInput?.addEventListener('kemet-input-status', ((event: CustomEvent) => {
  const field = event.detail.element.closest('kemet-field') as KemetField;

  if (event.detail.status === 'error' && event.detail.validity.valueMissing)  {
    field.message = "Your email is required!"
  } else {
    field.message = '';
  }
}) as EventListener);

messageTextarea?.addEventListener('kemet-input-status', ((event: CustomEvent) => {
  const field = event.detail.element.closest('kemet-field') as KemetField;

  if (event.detail.status === 'error' && event.detail.validity.valueMissing)  {
    field.message = "Tell us a little more about what you need!"
  } else {
    field.message = '';
  }
}) as EventListener);

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = new FormData(contactForm);
  const url = 'https://contact.hasanirogers.me/contact';

  const bodyData = {
    user: form.get('user'),
    phone: form.get('phone'),
    email: form.get('email'),
    message: form.get('message'),
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
      contactStatus.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

      const response = await fetch(url, config);
      const data = await response.json() as IData;

      if (data.message = 'SUCCESS') {
        contactStatus.innerHTML = 'Your message was sent successfully!'
      } else {
        contactStatus.innerHTML = 'There was a problem sending your message.'
      }
  } catch (error) {
    console.error(error);
  }
});
