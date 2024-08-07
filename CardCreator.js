import React, { useState } from 'react';

const TEMPLATES = [
  { id: 1, name: 'Birthday' },
  { id: 2, name: 'Anniversary' },
  { id: 3, name: 'Congratulations' },
];

const GreetingCardCreator = () => {
  const [template, setTemplate] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Form submitted.\nTemplate: ${template}\nMessage: ${message}\nImage: ${image ? image.name : 'No image selected'}.`);
  };

  return (
    <div>
      <h2>Create Your Greeting Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="template">Choose a Template:</label>
          <select 
            id="template" 
            value={template} 
            onChange={({ target }) => setTemplate(target.value)}
          >
            <option value="">Select a Template</option>
            {TEMPLATES.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message">Your Message:</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={({ target }) => setMessage(target.value)}
          />
        </div>

        <div>
          <label htmlFor="image">Upload an Image:</label>
          <input 
            type="file" 
            id="image" 
            onChange={({ target }) => setImage(target.files[0])} 
          />
        </div>

        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default GreetingCardCreator;