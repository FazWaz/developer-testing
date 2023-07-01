# The Exam
**User Story:**  
As a user, I want the property recommendation feature to provide better matches based on my history of free text input, so that I can find relevant properties more easily.  

**Acceptance Criteria:**  
**Given** that I am a logged-in user,  
**When** I enter free text in the search bar,  
**Then** the system should store the entered text in the user's search history.  

**Given** that the system has stored search history for a user,  
**When** the user initiates a property recommendation request,  
**Then** the system should retrieve the user's search history.  

**Given** that the system has retrieved the user's search history,  
**When** generating property recommendations,  
**Then** the system should consider the user's search history to improve matching.  

**Given** that the system has generated property recommendations based on the user's search history,  
**When** displaying the recommendations,  
**Then** the system should prioritize properties that have keywords matching the user's search history.  

**Given** that the system has displayed property recommendations,  
**When** the user interacts with a recommended property,  
**Then** the system should update the search history by storing the keywords related to the selected property.  

**Given** that the system has updated the search history,  
**When** the user initiates a new property recommendation request,  
**Then** the system should consider the updated search history for improved matching.  

**Given** that the system has considered the updated search history,  
**When** generating new property recommendations,  
**Then** the system should prioritize properties that have keywords matching the updated search history.  

**Given** that the system has generated new property recommendations based on the updated search history,  
**When** displaying the new recommendations,  
**Then** the system should present properties that have a higher relevance to the user's search history.  

------------
# My Solution

I've made 2 separate apps
* **FRONTEND**: Next js 13 with App dir. Uses Apollo. 
* **BACKEND**: Rails API with GraphQL & Admin app
  
These 2 apps are deployed to:
* Next JS 13 - Deployed to Vercel
* Rails API - Deployed to Heroku (I switched to postgres because mysql costs more while postgres is just $5.00)

## URLS:
### Admin:  https://mofazwaz-api-d36ad5e9c753.herokuapp.com/admin

Credentials
```
username: admin@example.com
password: password
```
<img width="1418" alt="Screenshot 2023-07-02 at 3 07 32 AM" src="https://github.com/FazWaz/developer-testing/assets/30344224/fda4d49a-0511-4201-a3b9-80d99f5f2d3f">


### Frontend: https://mofazwaz-next.vercel.app/
<img width="1097" alt="Screenshot 2023-07-02 at 3 08 34 AM" src="https://github.com/FazWaz/developer-testing/assets/30344224/fc4d131b-3419-4593-b772-60e4c9d75b5f">


## How the App works
### Searching 
* App can basically do a search of properties.
* Frontend is using Server components convention. No state and no hooks.
* Backend is returning records based on the `tags` fields of properties.
* Everytime a search has done, the app stores it. [Admin can view the search histories](https://mofazwaz-api-d36ad5e9c753.herokuapp.com/admin/search_histories)

### Viewing a Property
* All using server compoennts. When a property is cliekd it views it as a modal. Upon refresh it's a page of its own.
* Every view it mutates to API adding an [interacted property](https://mofazwaz-api-d36ad5e9c753.herokuapp.com/admin/interacted_properties)  that helps the  recommendation
* [Admin can view all interacted properties](https://mofazwaz-api-d36ad5e9c753.herokuapp.com/admin/interacted_properties)

## Recommendation
* App can recommend properties.
* Frontend is using server component convention.
* Backend is its own logic for recommendations:
  *  Get user last 5 history
  * Get last 5 interacted properties
  * Query 5 suggested properties based on user last 5 histories
  * Combine the interacted + suggested properties and iterate to
  * rank them which as the more relevance based on the user last 5 history
  * Combine the interacted + suggested properties and sort then by which among them has more relevance based on the user_searc_history value
  * Sort the properties by relevance in descending order
  * [See API logic here](https://github.com/FazWaz/developer-testing/blob/moseslucas/mofazwaz_rails_api/app/graphql/types/query_type.rb#L43)

