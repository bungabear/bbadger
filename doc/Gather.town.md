# Gather-Online-Count-Badge

Can make badge for gather.town online user count.

1. **Get Gather.town API Key**  
    https://gather.town/apiKeys  
    
    
2. **Find gether room ID**  
    Go to https://gather.town/app  
    Then select your room and click **'Enter Space'**
    ![](https://github.com/bungabear/bbadger/raw/main/doc/gather-room-id.jpg)
    
    
3. **Make & Test API Url**  
    ```
    https://gather.town/api/getRoomInfo?room=[room id here]&apiKey=[apiKey here]
    ```
    You can see response body
    ```json
    {
      "gameServerPool": "production",
      "name": "TheForest",
      "id": "e5kK4mRdSOALriFT\\TheForest",
      "serverURL": "wss://premium-008.gather.town/",
      "roomCount": 0,
      "settings": {

      },
      "map": "forest-v1",
      "hasGuestlist": false
    }
    ```
4. **Make Badge Url & Test**  
    ```
    https://bbadger.herokuapp.com//?url=https://gather.town/api/getRoomInfo?room=[room id here]&apiKey=[apiKey here]
    ```
5. **Embed as image**  
