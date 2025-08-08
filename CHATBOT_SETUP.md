# Chatbot Setup Instructions

## 1. Install Required Dependencies

Run the following command in your project root:

```bash
npm install @google/generative-ai
```

## 2. Environment Variables Setup

Create or update your `.env.local` file in the project root and add your Gemini API key:

```env
# Add this line to your .env.local file
GEMINI_API_KEY=your_gemini_api_key_here
```

### How to get your Gemini API Key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it in your `.env.local` file after `GEMINI_API_KEY=`

## 3. File Structure

The chatbot implementation includes:

- `src/components/ui/Chatbot.tsx` - Main chatbot component
- `src/app/api/chat/route.ts` - API route for Gemini integration
- Added to `src/components/sections/Contact.tsx` - Integration with contact page

## 4. Features

### Chatbot UI:
- Modern glass morphism design matching your website
- Responsive design (mobile and desktop optimized)
- Smooth animations with Framer Motion
- Minimize/maximize functionality
- Typing indicators
- Message timestamps
- Scroll to latest message

### AI Features:
- Powered by Google's Gemini Pro model
- Context-aware responses as "Appu" 
- Handles errors gracefully
- Rate limiting awareness
- Focused on AI and Luminatus services

### Interaction:
- Click the floating chat button to open
- Type messages and press Enter or click Send
- Minimize/maximize with header controls
- Close with X button
- Auto-focus on input when opened

## 5. Customization

You can customize Appu's personality by modifying the context in:
`src/app/api/chat/route.ts` line 21

Current context: "You are Appu, an AI assistant for Luminatus AI company. Be helpful, friendly, and knowledgeable about AI, technology, and Luminatus services. Keep responses concise but informative."

## 6. Security Notes

- API key is stored server-side only
- Never expose GEMINI_API_KEY in client-side code
- API calls go through your Next.js API route
- Error handling prevents API key exposure

## 7. Testing

After setup:
1. Restart your development server
2. Navigate to the Contact section
3. Click the floating chat button (bottom right)
4. Test with messages like "What is Luminatus?" or "Tell me about AI services"

## Environment File Example

Create `.env.local` in your project root:

```env
# Gemini API Configuration
GEMINI_API_KEY=AIzaSyC7x1x2x3x4x5x6x7x8x9x0x1x2x3x4x5x6

# Other environment variables...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Troubleshooting

### Common Issues:

1. **"Gemini API key not configured"**
   - Ensure `.env.local` exists in project root
   - Check the API key is correctly set
   - Restart the development server

2. **"Cannot find module @google/generative-ai"**
   - Run `npm install @google/generative-ai`
   - Clear node_modules and reinstall if needed

3. **API quota exceeded**
   - Check your Google AI Studio quota
   - Gemini Pro has generous free tier limits

4. **Invalid API key**
   - Verify the API key in Google AI Studio
   - Ensure no extra spaces in .env.local
   - Check the key hasn't been revoked

## Next Steps

The chatbot is now integrated and ready to use! You can:
- Customize the appearance in `Chatbot.tsx`
- Modify AI responses in the API route
- Add more context about your specific services
- Implement conversation history storage
- Add user authentication for personalized responses
