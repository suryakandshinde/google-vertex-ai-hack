
# Note about video presentation
The solution was initially implemented used **Google Vertex AI Agent** but, I realized that I can not get the Chat App approved from Google before the hackathon deadline. 

I have recorded a demo of Google Vertex AI Agent App (using my test account) to show what the experience looks like with Vertex AI Agent App.

More detail about the approval process: https://support.google.com/cloud/answer/13463073?hl=en
<img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/google_oauth_approval.png" width="60%" /> 

## Video Demo/Pitch and Live Demo:
- Live Demo (https://genai-demo-vq5zkwn4yq-uc.a.run.app/site) - You may have to wait for 30 seconds for the demo site to come up on your first request.
- [Demo Pitch/Presentation](https://youtu.be/kWtTZmm8bFY) (using Vertex AI Agent App): https://youtu.be/kWtTZmm8bFY

<code style="color : darkorange">**Please Note**:  The demo is hosted using a free trial account on (render.com). Free instance will spin down without any activity. Please wait for 50 seconds after your first request for site to come up. Also, since this application is using sqllite, the database is refreshed with every restart of instance.
</code>


# Inspiration (Business Scenario)
The integration of Generative AI (GenAI) capabilities and tools in any industry holds immense potential to revolutionize the customer experience and streamline operations. **Rental Car Industry** is one of those industries.

My idea is to leverage Google's low-code/no-code AI solutions to revolutionize the customer experience and streamline operations for rental car business.

```An existing rental car company want to leverage AI/ML and GenAI (Google AI, Vertex AI's and Low-Code/No-Code) capabilities to provide exceptional customer experience. The GenAI capabilities will allow customers of the rental car company to complete tasks like booking a car, cancellation etc. with help of GenAI trained Chat Bot/Agent. The company want to understand customer needs/sentiments and adapt quickly to keep their customers happy.```

```The company also want to leverage their existing IT investments (e.g., APIs/services that they already have, data and knowledge base) to deliver cutting edge GenAI capabilities in **cost efficient manner**.```

Live Demo  (wait for 30 seconds to restart server on your first request): [https://genai-demo-vq5zkwn4yq-uc.a.run.app/site/](https://genai-demo-vq5zkwn4yq-uc.a.run.app/site/) (deployed on render.com for demo)


## What it does (Business impact)? 
As part of this implementation, a fully functional AI Chat Agent is developed using Google's AI services for a rental car business. 
The implementation will help both sides (rental car customer as well as rental car business).

### What a Rental car business will get?
- GenAI capabilities will uncover hidden opportunities for a rental car business by learning from existing knowledgebase
- Allow businesses to cross-sell and upsell services/products by understanding customer needs and sentiments
- Retain customer by addressing their concerns before they leave and increase brand loyalty
- Leverage **existing IT investments** (APIs, services, content, data etc.) to enable GenAI capabilities at **lightning speed**
- Easy, Fast and Cost-effective integration of AI/ML and GenAI capabilities to generate more value for business
- Harness the power AI/ML and GenAI to deliver the best customer experience and exceed the customer satisfaction

### What Customers will get?
- An exceptional experience of interacting with GenAI based chat agent (not like traditional chat bots)
- Complete tasks like rental car booking, cancellation, booking lookup and provide feedback about service
- A real human like experience through the interaction with AI Bot
- Get more contextual information that sometime humans may not have or remember
- Avail rental car related service 24x7 with same quality and accuracy

## How we built it?
Following tools and technologies are used to building this solution/demo ([Project Setup and Build Instructins](#setup)):

**Google Project ID**: woven-mesh-421014 (name: Google AI Hack 2024)

- **Google AI Studio / Gemini** ( **gemini-1.0-pro-001** - [https://aistudio.google.com/app/prompts]) 
    - Used for finetuning AI Agent response using prompt engineering/system instructions and example scenarios (few-shot prompting)
    - Used for sentiment analysis of user feedback/comments (using Google Node.js SDK)
    - Used for suggesting an promotional offer to a customer based on sentiment analysis of feedback (if feedback was negative)
    - [Read more about implementation](#google-ai-studio)
- **AI Chat Assistant** 
    There are 2 versions of AI Chat Agent. First one using Low/No-Code Google Vertex AI Agent and, second Custom Chat widget using HTML and JS. The. The **Vertex AI Agent will not work for all users while app is in Testing environment**.
    - Google Vertex AI Agent and Dialogflow (Low-Code Chat Assistant - https://cloud.google.com/dialogflow/vertex/docs/quick/create-application)
    - Custom HTML/JS based chat widget (built this for demo as Vertex AI Agent will not work for all users while app is in Testing environment).
    - Used as a low-code solution to provide human like chat experience to users and assist them with various rental services
    - [Read more about implementation](#google-vertex-ai-assistant)    
- **Google -  Node.js SDK** (`@google/generative-ai` and `@langchain/google-genai`) 
    - Interact with Gemini via Node.js for building REST APIs
- **NestJS** 
    - For building REST API. Google Vertex AI Agent uses these API (TOOL)
    - [Read more about implementation](#nestjs-rest-apis-and-swaggeropen-api) 
- **Static Web Page (HTML/CSS)**
    - Demo page for hosting Vertex AI Chat UI 
    - [Read more about implementation](#live-demo) 

This is a fully functional AI Chat Agent/Assistant powered by Google AI for a rental car business. The application uses **Google AI Studio/Gemini** and **Vertex AI Agent/Conversation** primarily. 

The Google AI (Gemini) and Vertex AI Agent capabilities are leveraged to provide an exceptional customer experience to a rental car company. The AI Agent will help customers finding a right car, booking a car, sending email confirmation, cancelling booking, perform sentiment analysis of customer feedback (about rental car experience). If the feedback is negative/unsatisfied, suggest an offer to retain and make them happy.

### What is included in the implementation?
<img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/chat_assisstant_overview.png" /> 

- **1. Google AI (Gemini) Model and Prompts**: Leverage prompt template and prompt engineering to interact with customer, analyze customer feedback to determine sentiment and suggest an offer
    - Google AI Studio ([Prompts](https://aistudio.google.com/app/prompts))
    - Google AI Node.js SDK (`@google/generative-ai`) for REST API: https://genai-demo-vq5zkwn4yq-uc.a.run.app/api
    - [Read more about implementation](#google-ai-studio)

- **2. Google Vertex AI Agent**: Vertex AI Assistant for interactive chat. Following features are implemented using Vertex AI Assistant:
    - Assist user finding a rental car (with specific make, model, in a particular city etc.)
    - Assist user booking a rental car
    - Use Vertex AI Assistant to collect customer feedback about the rental car service  
    - Analyze the feedback (sentiment analysis) dynamically using the Gemini Node.js SDK (integrated via Agent TOOL)
    - Suggest an appropriate offer to customer based on the sentiment analysis of the feedback
    - Use Vertex AI AGENT and TOOL to interact with existing business functions (via existing REST API)  
    - [Read more about implementation](#google-vertex-ai-assistant)    

- **3. REST API/Open API/Swagger**: `REST API and Swagger/YAML` to create a custom integration (Agent TOOL) for Vertex AI Assistant. 
    - REST APIs to perform rental car related operations (list car, booking, cancellaton etc.)
    - Vertex AI Agent will use these API (via TOOL capability of Agent App) to perform business action via chat
    - Vertex AI Agent will be able to provide contextual information/response to customer
    - Gemini integration will analyze customer feedback to determine sentiment and suggest an offer to unsatisfied customers
    - OpenAPI/Swagger definition: https://genai-demo-vq5zkwn4yq-uc.a.run.app/api
    - [Read more about implementation](#nestjs-rest-apis-and-swaggeropen-api)    


- **4. Web Application**: A web page/application integrated with Vertex AI Assistant Web Chat for demo. 
    - Demo: https://genai-demo-vq5zkwn4yq-uc.a.run.app/site
    - [Read more about implementation](#live-demo) 

## Challenges we ran into
- A little research and planning was needed to understand how to stich various GenAI capabilities together
- Choosing a use case for implementation that demonstrates Google's AI capabilities as well as provides business value was not easy
- Initially the API integration (via Node.js) was not available for Gemini 1.5 Pro
- Hosting demo (eventually hosted on a free cloud service render.com)

## Accomplishments that we're proud of
- Able to build and deliver an end-to-end working business use case leveraging Google's capabilities
- Learning and gaining knowledge about Google's AI capabilities

## What we learned
- This is my first project using Google's AI services and I learned a lot
- Learned about various capabilities and services offered by Google to enable GenAI capabilities of an individual and businesses
- Was able to compare Google's services with other similar services

## What's next for Customer Experience AI (CxAI)
For this demo, only a small subset of use cases was developed to demonstrate **Art of the Possible** with Google's AI capabilities. The possibilities with GenAI in customer experience space are exciting and endless. It will be and interesting project to explore further by adding more capabilities

## Live Demo
 Wait for 30 seconds to restart server on your first request.

- Live Demo: [https://genai-demo-vq5zkwn4yq-uc.a.run.app/site/](https://genai-demo-vq5zkwn4yq-uc.a.run.app/site/) (deployed on render.com for demo)
- Swagger UI: [https://genai-demo-vq5zkwn4yq-uc.a.run.app/api](https://genai-demo-vq5zkwn4yq-uc.a.run.app/api)
- Swagger JSON: [https://genai-demo-vq5zkwn4yq-uc.a.run.app/api-json](https://genai-demo-vq5zkwn4yq-uc.a.run.app/api-json)

### Test Script to try with the Vertex AI Agent
- Book a car scenario: 
    - User: `I want to book a car`
    - User: `I want a Ford in Toronto. Can you show me which cars you have?`
    - User: `Do you want to show me the details for cars`
    - User: `Ford E150`
    - User: `Ok, I'll book this car`
    - User: `I want it for 2 days starting 29th April`
    - User: `Suryakand Shinde, <removed for privacy reason>`
    - User: `Thanks`
- Cancel booking: 
    - User: `Can you help with cancellation of a booking?`
    - User: `The booking id is 1`
- Find reservation: 
    - User: `Show me booking details`
    - User: `The booking id is 1`
- Sentiment Analysis: 
    - User: `As a feedback, I also wanted to say that my experience with booking car was not good. It took a long time for me to book a car.`
    - User: `The staff could be more polite and help customers on time`

## Want to learn more about the solution?
More details about tools/services that are used for developing the solution.

### Google AI Studio
Fine-tune LLM using various prompts to train and optimize model to perform following tasks:
- Interact (like real human) with customers and assist them with a rental car booking, cancellation etc.
    
    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/prompt_1.png" />

- Perform sentiment analysis of the feedback provided by customers

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/prompt_2.png" />

- Based on training (prompts, instructions), suggest suitable offer to an unsatisfied customer

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/prompt_3.png" />

### Google Vertex AI Assistant
Below are  **Visualization** of Vertex AI Assistant **AGENT** and **TOOL**

<img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/vertex_ai_gemini_agent_console.png" /> 

- **AGENTS - handle customer interaction**

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/agent_1.png" />

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/agent_2.png" />

- **TOOLS - invoke external systems/APIs via OpenAPI Integration**

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/tool_1.png" width="100%"/>

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/tool_2.png" width="100%"/>

### NestJS REST APIs and Swagger/Open API
- Google Gemini Service (Swagger/OpenAPI) - for human like chat using LLMs/Gemini and Sentiment Analysis

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/api_1.png" />

- Rental Car Services  - for rental car related service (book a car, cancel booking, search booking)

    <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/api_2.png"/>


## Image Gallery

- **Google Vertex AI Assistant web page integration** integrated with web page: https://genai-demo-vq5zkwn4yq-uc.a.run.app/site/
![Vertex AI Assistant](https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/web_chat_integration.png "Vertex AI Assistant Integrated with Web Page")

- **Google Vertex AI Assistant Chat Screens**
    - Use case 1: Booking a rental car

        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/book_1.png" width="250" />

        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/book_2.png" width="250" /> 

        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/book_3.png" width="250" /> 
        
        Booking confirmation email:
        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/book_4.png" />

    - Use case 4: Sentiment analysis and offer suggestion
        
        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/feedback_1.png" width="250" /> 

        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/feedback_2.png" width="250" /> 

    - Use case 3: locate/search an existing booking
        
        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/find_booking_1.png" width="250" /> 

    - Use case 4: Sentiment analysis and offer suggestion
        
        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/feedback_1.png" width="250" /> 

        <img src="https://github.com/suryakandshinde/google-vertex-ai-hack/raw/main/docs/feedback_2.png" width="250" /> 


# Setup

## Environemnt setup
- Please see `.sample.env` file for list of environment variables that you need to configure
- Rename the `.sample.env` file to `.env`
- You need an `GOOGLE_API_KEY` Key to run this application. 
- Update MAIL related configs (you can use your any Gmail Account). You may have to follow the steps to enable sending email using your Gmail account, follow this article: [Sign in with app passwords](https://support.google.com/mail/answer/185833?hl=en)
- `LOAD_SAMPLE_DATA` flag controlls whether to load sample data or not? Set this to `true` for first run ONLY.

```bash
#environment variables

#General configurations
SERVER_URL=http://localhost:3000
PUBLIC_FOLDER=public

# Google PROJECT configurations
PROJECT_ID=woven-mesh-421014
MODEL_ID=gemini-1.0-pro-001
GOOGLE_API_KEY=<ENTER YOUR GOOGLE API KEY>

# Email configuration (sending transactional emails)
MAIL_HOST=smtp.gmail.com
MAIL_USER=<ENTER YOUR GMAIL USERNAME>
MAIL_PASS=<ENTER YOUR GMAIL APP PASSWORD>
MAIL_FROM="CxAI" <YOUR GMAIL USERNAME>

# This flag control whether to load sample CSV data from ./sqllite/sample/cars.csv file or not
# For first run keep this flag true, after that trun this to false. 
LOAD_SAMPLE_DATA=false

```

## Install dependencies

```bash
# Install dependencies
$ npm install
```

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Localhost access
- To access web application locally visit: http://localhost:3000/site
- To access APIs locally visit: http://localhost:3000/api
- Access chat: locate the chat icon on bottom right corner. There are 2 chat icons (one using Vertex AI Agent and another one classic HTML/CSS). If you are not one of test users, Vertex AI Agent chat will not work for you, please use other chat icon.

# References
- Mock data for rental car: https://www.mockaroo.com
- NestJS: https://nestjs.com
- Langchain: https://www.langchain.com
- Site template: colorlib
