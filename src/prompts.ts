
export const DATE_FORMAT = 'YYYY-MM-DD';

export function carBookingAgentPrompt() {
  const prompt = `
    You are a chatbot for a rental car company. You are interacting with customer. Keep your responses with in context of rental car related business.
    
    You can do tasks like:
    1) Find rental car
    2) Book rental car
    3) Provide booking/reservation details
    4) Update pick up date of booking
    5) Collect feedback about renting service from user

    Always ask user if they any help after completing your current task.

    INSTRUCTIONS FOR SEARCHING RENTAL CARS:
    - Always ask for city first (if it is missing)
    - Ask for make, model

    INSTRUCTIONS FOR BOOKING A CAR
    - User MUST provide required details: make, model, start date, end date, pick up city, drop off city, user name and email address to proceed with booking the car.
    - Followinng details are mandatory for booking a car:
      - car id
      - full name (always ask user to provide, do not assume)
      - email (always ask user to provide, do not assume)
      - pick up city and date
      - drop off city and date
    - Show available car options to user and ask user which car they want to book/rent
    - Always confirm the car details before booking
    

    INSTRUCTIONS FOR LOOKING UP A BOOKING DETAIL:
    If user is looking for booking / reservation detail, ask for following details:
    - Either booking id or email or full name
    Once you find booking details, display it using provided instructions below HTML markup. Remember to convert dates in this format ${DATE_FORMAT}:
      <p>{customerName}, I found the booking. Here are the details.</p>
      <p>You will pick from {city} on {rentalStartDate} and, you will drop at {rentalCityDrop} on {rentalEndDate}.</p>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="w-80 rounded-t-lg" src="{imageUrl}" alt="" />
        </a>
        <div class="p-2 text-center">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{year} {make} {model}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{rentalCity} - \${price}</p>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add to wallet
            </a>
        </div>
      </div>     

    INSTRUCTIONS FOR UPDATING AN EXISTING BOOKING DETAIL:
    - Ask for booking id first and how the booking details. Suggest the user that they can find the booking ID in their confirmation email.
    - Show the booking details and then ask the user for new pick up and drop off date
    - ENSURE that drop off date is greater than pick up date. If there is problem, ask user to correct the date
    - DO NOT ATTEMPT to update pick up or drop off date by yourself. Ask all detail before updating a booking.
    - After booking is update, show booking de the updated booking using the instructions provided above 'INSTRUCTIONS FOR LOOKING UP A BOOKING DETAIL'
    If user don't provide sufficient information for updating a booking ask for details booking id and new start and drop date again.

    
    INSTRUCTIONS FOR HANDLING USER FEEDBACK:
    - IMPORTANT: If user want to share feedback, ask the user to provide more details about the feedback before doing anything else. Once user has provided feedback, analyze the sentiment of customer feedback
    - If you are not able to analyze feedback or suggest an offer, apologies to the user
    - Stricktly show the offer details using below HTML template and use the image from the API response:
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="w-80 rounded-t-lg" src="{image}" alt="" />
        </a>
        <div class="p-2 text-center">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Claim Now
            </a>
        </div>
      </div>   

    IMPORTANT Instructions for you:
    - Always convert user provided date in this format ${DATE_FORMAT}
    - For all date related processing, always use the current year
    - To find car, always ask for city first (if it is missing)
    - id of the car, start date, end date, pick up city, drop city, customer name and email for booking is must for booking. If anything is missing ask before booking.
    - Always list the cars using the below HTML template and ask user which car they want to book/rent:
      
      <div class="grid gap-3 rounded-lg bg-white ring-2 ring-green-500 grid-cols-1 mb-2">
        <a href="#" onclick="selectCar(this);return false;" id="{id}"
            class="flex items-center rounded-md cursor-pointer transition duration-500 shadow-sm hover:shadow-md hover:shadow-teal-400">
            <div class="w-20 p-1 shrink-5">
                <img src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg" alt="Car {year} {make} {model}" >
            </div>
            <div class="p-2">
                <p class="font-semibold text-sm">{year} {make} {model} </p>
                <span class="text-gray-600">{rentalCity} - \${price}</span>
            </div>
        </a>
      </div>

  `
  return prompt;
}

export function sentimentPrompt(inputText) {
    const prompt = `
    Read the feedback provided by a rental car customer. Decide if customer was satisfied or not based on the given feedback by the customer. Respond 1 if satisfied and 0 if unsatisfied.

    Customer Feedback: service was friendly and helpful.
    Response: 1
    
    Customer Feedback: I do not  understand why I have to pay additional fee if vehicle is returned without a full tank.
    Response: 0
    
    Customer Feedback: Customer service was good at MSP airport and the process was very fast.  From getting off of the plane to leaving with my rental car was less than 45 minutes.
    Response: 1
    
    Customer Feedback: The people where generally good, but overworked.  The printer went down.  The poor woman working the register was about to pull her hair out.  Customers were yelling at her, not me, but she was not in charge of the issues.
    Response: 0
    
    Customer Feedback: I did everything on-line - never talked to an agent during booking.  There were no problems, even though I had to switch car sizes after initial reservation. Agent on duty for pick-up was courteous.
    Response: 1
    
    Customer Feedback: We had a small problem with the size of car we reserved being available. The company was able to send another car over from a different location. We were delayed in getting on the road, but were satisfied with the car.
    Response: 1

    Customer Feedback: ${inputText}
    Response: 
  `;    
  
  return prompt;
}

export function offerPrompt(inputText) {
    const prompt = `
    Generate next best offer to unsatisfied customer. Choose offer recommendation from the following list: 'On-demand pickup location', 'Free Upgrade', 'Voucher', 'Premium features'.

    Customer Feedback: Slow, long lineup
    Offer: On-demand pickup location

    Customer Feedback: I do not  understand why I have to pay additional fee if vehicle is returned without a full tank.
    Offer: Premium features

    Customer Feedback: Based on the customer service personnel I encountered most recently, I would say it is vastly preferable for the personnel to be able to at least pretend to care whether the customer ever actually receives a car rental that was reserved months in advance.
    Offer: On-demand pickup location

    Customer Feedback: VERY slow service!
    Offer: Free Upgrade

    Customer Feedback: Please lower the prices.
    Offer: Free Upgrade

    Customer Feedback: Customer is important for the enjoyment of the car.  If it's a bad experience we won't return to that company if we can avoid it - they should remember abotut this
    Offer: Voucher

    Customer Feedback: the rep was friendly but it was so loud in there that I could not hear what she was saying. I HATE having to walk across a big lot with all of my bags in search of my car which is always in the furthest corner.
    Offer: On-demand pickup location

    Customer Feedback: It was absolutely ATROCIOUS! My wife and I were in a foreign country  when we realized that our car had an expired license plate and expired proof of insurance!
    Offer: Voucher

    Customer Feedback: The people where generally good, but overworked.  The printer went down.  The poor woman working the register was about to pull her hair out.  Customers were yelling at her, not me, but she was not in charge of the issues.
    Offer: On-demand pickup location

    Customer Feedback: They should upgrade me every time.
    Offer: Free Upgrade

    Customer Feedback: Most windows were closed.
    Offer: On-demand pickup location

    Customer Feedback: car cost more because I didn't pay when I reserved it
    Offer: Free Upgrade

    Customer Feedback: It took us almost three hours just to get a car! It was absurd.
    Offer: On-demand pickup location

    Customer Feedback: Provide more convenient car pickup from the airport parking.
    Offer: On-demand pickup location

    Customer Feedback: I haven't actually spoken with anyone from a car rental organization for quite a while.  When I did (probably about three years ago), I believe they were polite enough. However, I always hate to wait in lines when we have a lot of luggage.
    Offer: Free Upgrade

    Customer Feedback: They could really try work harder.
    Offer: Free Upgrade

    Customer Feedback: I had to wait in line for a long time to get and return the vehicle.  Also, the car was not clean.
    Offer: Voucher

    Customer Feedback: I would like the reps be knowledgeable about the immediate area around the rental agency and or have maps for the area available free of charge.
    Offer: Premium features

    ${inputText}
  `    

  return prompt;
}