const axios = require('axios');
const { faker } = require('@faker-js/faker');


const API_URL = 'http://localhost:3001/api';


const createFAQs = async (count) => {
  console.log('Iniciando criação de FAQs...');
  for (let i = 0; i < count; i++) {
    const faq = {
      question: faker.lorem.sentence(),
      answer: faker.lorem.paragraph(),
    };

    try {
      const response = await axios.post(`${API_URL}/faqs`, faq, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`FAQ criada: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error(`Erro ao criar FAQ: ${error.message}`);
    }
  }
  console.log(`${count} FAQs criadas.`);
};

const populateFAQs = async () => {
  try {
    await createFAQs(48);
    console.log('FAQs populadas com sucesso.');
  } catch (error) {
    console.error('Erro ao popular FAQs:', error);
  }
};

populateFAQs();