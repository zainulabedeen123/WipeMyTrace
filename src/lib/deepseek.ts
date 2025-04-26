const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-fc1b8b3efa374255b52aea00cf9056f5';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function generateEmailTemplate(
  jurisdiction: 'GDPR' | 'CCPA',
  userDetails: {
    name: string;
    address: string;
    email: string;
    phone: string;
  },
  companyDetails: {
    name: string;
    type: string;
  }
): Promise<string> {
  const prompt = `Generate a ${jurisdiction} compliant data deletion request email template with the following details:
  
  User Details:
  - Name: ${userDetails.name}
  - Address: ${userDetails.address}
  - Email: ${userDetails.email}
  - Phone: ${userDetails.phone}
  
  Company Details:
  - Name: ${companyDetails.name}
  - Type: ${companyDetails.type}
  
  The email should be professional, legally compliant, and include all necessary sections for a ${jurisdiction} data deletion request.`;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a legal expert specializing in data privacy regulations. Generate professional and legally compliant email templates for data deletion requests.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating email template:', error);
    throw error;
  }
} 