(function() {
    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">');
    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />');
    document.head.insertAdjacentHTML('beforeend', '<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>');
  
    // Inject the CSS
    const style = document.createElement('style');
    style.innerHTML = `
    .hidden {
      display: none;
    }
    #chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      flex-direction: column;
    }
    #chat-popup {
      height: 80vh;
      max-height: 80vh;
      transition: all 0.3s;
      overflow: hidden;
    }
    @media (max-width: 768px) {
      #chat-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
    }
    `;
  
    document.head.appendChild(style);
  
    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    document.body.appendChild(chatWidgetContainer);
    
    // Inject the HTML
    chatWidgetContainer.innerHTML = `
      <div id="chat-bubble" class="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center cursor-pointer text-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div id="chat-popup" class="hidden absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm">
        <div id="chat-header" class="flex justify-between items-center p-4 bg-blue-800 text-white rounded-t-md">
          <h3 class="m-0 text-light text-lg">Your Chat Assisstant</h3>
          <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>         
        </div>
        <div id="chat-messages" class="flex-1 p-4 overflow-y-auto">
        </div>
        <div id="chat-input-container" class="p-4 border-t border-blue-200">
          <div class="flex space-x-4 items-center">

            <textarea id="chat-input" rows="2" class="flex-1 border border-blue-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Write your thoughts here..."></textarea>

            <button id="chat-submit" class="bg-blue-800 text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
          </div>
          <div class="flex text-center text-xs pt-4">
          <div class="flex items-center p-1 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            <label class="inline-flex p-1 items-center me-5 cursor-pointer">
              <input id="tools" type="checkbox" value="" class="sr-only peer" checked onclick="toggleTools()">
              <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-blue-400 dark:text-blue-500">Use Tools</span>
            </label>         
            <span class="flex-1">Use tool to call custom APIs/Service for more contextualized results.</span>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Add event listeners
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const chatMessages = document.getElementById('chat-messages');
    const chatBubble = document.getElementById('chat-bubble');
    const chatPopup = document.getElementById('chat-popup');
    const closePopup = document.getElementById('close-popup');
    const btnFeedback = document.getElementById('btnFeedback');
    const toolsToogleCheckBox = document.getElementById('tools');

    var chatApi = '/google/function-calling/chat';
    var sentimentApi = '/sentiment';
    var feedbackApi = '/feedback';

    var feedbackOptionSelected = false;
    var chatHistory = [];
    var selectedCarId = null;

    window.showSpinner = function() {
      
      var spinnerHtml = `
      <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>       
      `;

      const spinnerElement = document.createElement('div');
      spinnerElement.id = 'spinner';
      spinnerElement.className = 'text-center';
      spinnerElement.innerHTML = spinnerHtml;

      chatMessages.appendChild(spinnerElement);

      // chatInput.disabled = true;
      chatSubmit.disabled = true;
    }

    window.hideSpinner = function() {
      const spinner = document.getElementById('spinner');
      if(spinner) {
        chatMessages.removeChild(spinner);
      }

      // chatInput.disabled = false;
      chatSubmit.disabled = false;      
    }

    window.selectCar = function(event) {
      console.log(event);
      selectedCarId = event.id;
      onUserRequest(`I want to book the car: ${selectedCarId}`);
    }

    window.toggleTools =  function () {
      if(toolsToogleCheckBox.checked) {
        chatApi = '/google/function-calling/chat';
      } else {
        chatApi = '/chat';
      }
    } 

    chatSubmit.addEventListener('click', function() {
      const message = chatInput.value.trim();
      if (!message) return;
      
      chatMessages.scrollTop = chatMessages.scrollHeight;
  
      chatInput.value = '';
  
      onUserRequest(message);
  
    });
  
    chatInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        chatSubmit.click();
      }
    });
  
    chatBubble.addEventListener('click', function() {
      togglePopup();
    });
  
    closePopup.addEventListener('click', function() {
      togglePopup();
    });
  
    function togglePopup() {
      const chatPopup = document.getElementById('chat-popup');
      chatPopup.classList.toggle('hidden');
      if (!chatPopup.classList.contains('hidden')) {
        document.getElementById('chat-input').focus();
      }
    }  
  
    function getOffer(message) {
        var requestBody = {
            text: message,
            history: []
        };

        $.post(feedbackApi, requestBody, function(data, status) {
            if(data.sentiment == '0') {
                $.get('/offer/'+ data.offer, function(offer, status) {
                    cardReply(offer.asset, offer.name, offer.description);                     
                });
            }
        });        
    };

    function sendRequestToBot(chatRequestApiUrl, message, history) {
        var requestBody = {
            text: message,
            history: history
        };

        $.post(
            chatRequestApiUrl, requestBody, function(data, status) {
                // alert("Data: " + data + "\nStatus: " + status);
                if(feedbackOptionSelected) {
                    if(data.text == '0') {
                        reply('Sorry to hear that you are not happy with our service. We always want to serve you better and here is an offer for you!');
                        getOffer(message);
                    } else {
                        reply('Thank you for your feedback!')
                    }
                } else {
                    reply(marked.parse(data.text));
                    chatHistory.push({
                        role: "model",
                        parts: [{ text: data.text}],
                    });
                }

            }
        );
    };

    function onUserRequest(message) {
      // Handle user request here
      console.log('User request:', message);

      if(feedbackOptionSelected) {
        sendRequestToBot(sentimentApi, message, []);
      } else {
        sendRequestToBot(chatApi, message, chatHistory);
      }
     

      chatHistory.push({
        role: "user",
        parts: [{ text: message}],
      });      

      // Display user message
      const messageElement = document.createElement('div');
      messageElement.className = 'flex justify-end mb-3';
      messageElement.innerHTML = `
        <div class="bg-green-500 text-white rounded-lg py-2 overflow-y-auto px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(messageElement);
      chatInput.value = '';

      window.showSpinner();

      chatMessages.scrollTop = chatMessages.scrollHeight + 5;
    }
    
    function cardReply(assetUrl, title, description) {
      reply(`
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="w-80 rounded-t-lg" src="${assetUrl}" alt="" />
            </a>
            <div class="p-2 text-center">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${description}</p>
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Claim Now
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
      `);        
    }
    
    function reply(message) {
      const chatMessages = document.getElementById('chat-messages');
      const replyElement = document.createElement('div');
      replyElement.className = 'flex mb-3';
      replyElement.innerHTML = `
      <div class="row">
        <div class="bg-gray-100 text-black rounded-lg py-2 px-4 max-w-[70%]">
            ${message}
        </div>
      </div>
      `;
      chatMessages.appendChild(replyElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      window.hideSpinner();
    }

    window.feedbackBtnClickHandler = function() {
        feedbackOptionSelected = true;
        reply('Sure, please provide a brief summary of your expereince.');
    };

    // reply(`Hello! How can I help you?`);

    reply(`
        <div class="text-center">
          <p>We love feedback so that we can constantly improve. What would like to provide?</p>
          <div class="flex-wrap">
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" id="btnFeedback" onclick="feedbackBtnClickHandler()">Feedback</button>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" id="btnFeedback" >Rating</button>
          </div>
        </div>
    `);


  })();