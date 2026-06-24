import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

/**
 * Generare imagine cu DALL-E 3
 */
export async function generateImageWithDALLE(prompt, style = 'photorealistic') {
    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/images/generations`,
            {
                model: 'dall-e-3',
                prompt: `${prompt} in ${style} style`,
                n: 1,
                size: '1024x1024',
                quality: 'hd',
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.data[0].url;
    } catch (error) {
        console.error('DALL-E error:', error.response?.data || error.message);
        throw new Error('Failed to generate image with DALL-E');
    }
}

/**
 * Generare text cu GPT-4
 */
export async function generateTextWithGPT(prompt, tone = 'profesional') {
    try {
        const response = await axios.post(
            `${OPENAI_API_URL}/chat/completions`,
            {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional copywriter. Write in ${tone} tone.`,
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                max_tokens: 500,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('GPT-4 error:', error.response?.data || error.message);
        throw new Error('Failed to generate text with GPT-4');
    }
}
