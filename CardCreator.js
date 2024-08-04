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

  const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('template', template);
    formData.append('message', message);
    formData.append('image', image);

    console.log('Form submitted. Template:', template, 'Message:', message, 'Image:', image.name);
  };

  return (
    <div>
      <h2>Create Your Greeting Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="template">Choose a Template:</label>
          <select id="template" value={template} onChange={handleTemplateChange}>
            <option value="">Select a Template</option>
            {TEMPLATES.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message">Your Message:</label>
          <textarea id="message" value={message} onChange={handleMessageChange}></textarea>
        </div>
        <div>
          <label htmlFor="image">Upload an Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default GreetingCardCreator;